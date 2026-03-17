import fs from 'node:fs/promises';
import path from 'node:path';
import * as Sentry from '@sentry/node';
import { type Message, PermissionsBitField } from 'discord.js';
import { config } from '../config.js';
import {
	channelsPostedIn,
	userMessageHistory,
} from '../services/moderation.js';
import { setRole } from '../services/roles.js';
import {
	addBannedSave,
	addSave,
	banFromRole,
	decodeSave,
	getHighestHeroUnlocked,
	getSaves,
	isBannedFromRole,
	UPLOADS_DIR,
} from '../services/saves.js';

const AUTO_BAN_WORDS = ['nigger', 'nigga', 'jew', 'n1gger', 'n!gger'];

export async function onMessageCreate(message: Message): Promise<void> {
	if (message.author.bot) return;

	try {
		await handleMessage(message);
	} catch (error) {
		console.error('Unhandled error in messageCreate:', error);
		Sentry.captureException(error);
	}
}

async function handleMessage(message: Message): Promise<void> {
	if (message.channel.isDMBased()) {
		await handleDm(message);
		return;
	}

	if (!message.guild || !message.member) return;
	if (message.guild.id !== config.guildId) return;

	const memberJoinTime = message.member.joinedTimestamp ?? 0;
	const currentTime = Date.now();

	await handleRecruitmentChannel(message);
	await handleAutoMod(message, memberJoinTime, currentTime);
}

async function handleDm(message: Message): Promise<void> {
	if (isBannedFromRole(message.author.id)) {
		await message.reply(
			'Your save was determined to be illegitimate either because you cheated or used a different users save. You will no longer be eligible for ranks on the server.',
		);
		return;
	}

	const attachment = message.attachments.first();
	if (!attachment?.name?.includes('.txt')) return;

	console.log('Received DM save file');

	const filePath = path.join(UPLOADS_DIR, attachment.name);

	try {
		const response = await fetch(attachment.url);
		if (!response.ok)
			throw new Error(`Failed to download attachment: ${response.statusText}`);

		const buffer = Buffer.from(await response.arrayBuffer());
		await fs.writeFile(filePath, buffer);

		const rawData = await fs.readFile(filePath, 'utf8');

		if (!rawData.includes('7a990') && !rawData.includes('7e8bb')) return;

		const saveData = decodeSave(rawData);
		if (!saveData) {
			await message.reply(
				'Your save could not be read, be sure to copy the full text of the save file and try again.',
			);
			return;
		}

		const highestHeroUnlocked = getHighestHeroUnlocked(saveData);
		const rubies = saveData.rubies;
		const gameUID = saveData.uniqueId;

		const saves = getSaves();
		let userBanned = false;

		for (const entry of saves.saves) {
			if (!entry.gameUID) continue;

			if (
				(entry.gameUID === gameUID && entry.userID !== message.author.id) ||
				rubies > config.moderation.maxRubies
			) {
				userBanned = true;
				banFromRole(message.author.id);
				await message.reply(
					'Your save was determined to be illegitimate either because you cheated or used a different users save. You will no longer be eligible for ranks on the server.',
				);

				const guild = message.client.guilds.cache.get(config.guildId);
				const targetMember = guild?.members.cache.get(message.author.id);
				if (targetMember) {
					await targetMember.roles.set([]).catch(console.error);
				}
				break;
			}
		}

		if (userBanned) {
			addBannedSave({
				userID: message.author.id,
				gameUID,
				userBanned,
				save: rawData,
			});
		} else {
			addSave({ userID: message.author.id, gameUID, save: rawData });
			await setRole(
				highestHeroUnlocked,
				message,
				message.client,
				config.guildId,
			);
		}
	} finally {
		await fs
			.unlink(filePath)
			.catch((err) => console.error('Failed to clean up upload:', err));
	}
}

async function handleRecruitmentChannel(message: Message): Promise<void> {
	if (message.channel.id !== config.channels.recruitment) return;
	if (message.content.toLowerCase().startsWith('recruiting:')) return;
	if (!message.member) return;
	if (message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
		return;

	const messageText =
		`<@${message.member.id}> Hey, it appears you posted in <#${config.channels.recruitment}> without proper format or posted a non recruitment post.\n` +
		`<#${config.channels.recruitment}> is only for clans actively searching for members. If you are looking for a clan reach out to the clan leaders who have posted there.\n` +
		`If your post was a recruitment post, make sure to start it with "Recruiting:"`;

	await message.member
		.send(`${messageText}\n\n Message Copy: ${message.content}`)
		.catch(async () => {
			const fallback = message.client.channels.cache.get(
				config.channels.modFallback,
			);
			if (fallback?.isTextBased())
				await fallback.send(messageText).catch(console.error);
		});

	await message.delete().catch(console.error);
}

async function handleAutoMod(
	message: Message,
	memberJoinTime: number,
	currentTime: number,
): Promise<void> {
	if (!message.member) return;

	const isNewMember =
		memberJoinTime > currentTime - config.moderation.newMemberWindowMs;
	const hasMod = message.member.permissions.has(
		PermissionsBitField.Flags.ManageMessages,
	);
	const lowercaseContent = message.content.toLowerCase();

	const auditChannel = message.guild?.channels.cache.find(
		(ch) => ch.name === 'audit-log',
	);

	// Nitro scam
	if (!hasMod) {
		if (
			(lowercaseContent.includes('@everyone') ||
				lowercaseContent.includes('free') ||
				lowercaseContent.includes('steam') ||
				lowercaseContent.includes('airdrop')) &&
			(lowercaseContent.includes('nitro') ||
				lowercaseContent.includes('nltro')) &&
			(message.embeds.length > 0 || lowercaseContent.includes('https:/'))
		) {
			const content = message.content;
			await message.delete().catch(console.error);
			await message.member
				.ban({
					deleteMessageSeconds: 7 * 24 * 60 * 60,
					reason: 'posting nitro scam',
				})
				.catch(console.error);

			if (auditChannel?.isTextBased()) {
				await auditChannel
					.send({
						content: `Banned <@${message.member.id}> for posting nitro scam. Message content: \`\`\`${content}\`\`\``,
					})
					.catch(console.error);
			}
			return;
		}
	}

	// Discord.gg link from new member
	if (isNewMember && lowercaseContent.includes('discord.gg')) {
		await message.delete().catch(console.error);
		console.log(`Link posted by ${message.author.username}`);

		await message.member
			.send('Do not post links to other Discord Servers')
			.catch(console.error);

		if (auditChannel?.isTextBased()) {
			await auditChannel
				.send({
					content: `Warned <@${message.member.id}> for posting links to a different Discord server.`,
				})
				.catch(console.error);
		}
		return;
	}

	// Generic Google Play spam
	if (
		message.content.includes(
			'Checkout this game I am playing https://play.google.com',
		)
	) {
		await message.delete().catch(console.error);
		return;
	}

	// Racist words - new members only
	if (isNewMember) {
		for (const word of AUTO_BAN_WORDS) {
			if (lowercaseContent.includes(word)) {
				const content = message.content;
				await message.delete().catch(console.error);

				await message.member
					.send(
						'You have been banned from the Clicker Heroes Discord for posting racist comments.',
					)
					.catch(console.error);

				await message.member
					.ban({
						deleteMessageSeconds: 7 * 24 * 60 * 60,
						reason: 'Posted racist comments',
					})
					.catch(console.error);

				if (auditChannel?.isTextBased()) {
					await auditChannel
						.send({
							content: `Banned <@${message.member.id}> for posting racist comments. Message content: \`\`\`${content}\`\`\``,
						})
						.catch(console.error);
				}
				return;
			}
		}

		// Rapid-message spam - new members only
		if (!hasMod) {
			const userId = message.author.id;
			const history = userMessageHistory[userId] ?? [];
			history.push(currentTime);

			if (history.length > config.moderation.spamMessageCount) {
				const trimmed = history.slice(-config.moderation.spamMessageCount);
				userMessageHistory[userId] = trimmed;

				const oldest = trimmed[0];
				const newest = trimmed[trimmed.length - 1];

				if (
					oldest !== undefined &&
					newest !== undefined &&
					oldest - newest > -config.moderation.spamWindowMs
				) {
					const content = message.content;
					await message.delete().catch(console.error);
					await message.member
						.send('You have been banned for spamming')
						.catch(console.error);
					await message.member
						.ban({ deleteMessageSeconds: 7 * 24 * 60 * 60, reason: 'spamming' })
						.catch(console.error);

					if (auditChannel?.isTextBased()) {
						await auditChannel
							.send({
								content: `Banned <@${message.member.id}> for spamming (posting ${config.moderation.spamMessageCount} messages within ${config.moderation.spamWindowMs / 1000} seconds) Message content: \`\`\`${content}\`\`\``,
							})
							.catch(console.error);
					}
					return;
				}
			} else {
				userMessageHistory[userId] = history;
			}
		}
	}

	// Cross-channel spam
	if (!hasMod) {
		const userId = message.author.id;
		const channelId = message.channel.id;

		const userChannels = channelsPostedIn[userId] ?? {};
		let channelKeys = Object.keys(userChannels);

		userChannels[channelId] = currentTime;

		if (channelKeys.length > 3) {
			delete userChannels[channelKeys[0]];
			channelKeys = Object.keys(userChannels);
		}

		channelsPostedIn[userId] = userChannels;

		const timestamps = channelKeys
			.map((k) => userChannels[k] as number)
			.sort((a, b) => a - b);

		if (timestamps.length >= 4) {
			const first = timestamps[0];
			const last = timestamps[timestamps.length - 1];

			if (first !== undefined && last !== undefined && first - last > -10_000) {
				await message.delete().catch(console.error);
				await message.member
					.send('You have been banned for spamming')
					.catch(console.error);
				await message.member
					.ban({ deleteMessageSeconds: 7 * 24 * 60 * 60, reason: 'spamming' })
					.catch(console.error);

				if (auditChannel?.isTextBased()) {
					await auditChannel
						.send({
							content: `Banned <@${message.member.id}> for spamming (posting to 4 different channels within 10 seconds). Message content: \`\`\`${message.content}\`\`\``,
						})
						.catch(console.error);
				}
			}
		}
	}
}
