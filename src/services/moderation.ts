import * as Sentry from '@sentry/node';
import { DiscordAPIError, type Message, PermissionsBitField } from 'discord.js';
import { RESTJSONErrorCodes } from 'discord-api-types/v10';
import { config } from '../config.ts';

/** Discord API error codes that are expected and safe to ignore. */
const IGNORED_DISCORD_ERRORS = new Set([
	RESTJSONErrorCodes.UnknownMessage,
	RESTJSONErrorCodes.UnknownInteraction,
	RESTJSONErrorCodes.CannotSendMessagesToThisUser,
]);

const AUTO_BAN_WORDS = ['nigger', 'nigga', 'jew', 'n1gger', 'n!gger'];

/**
 * Silently ignores expected Discord API errors (e.g. message already deleted, DMs disabled)
 * and reports anything unexpected to Sentry.
 */
export function handleDiscordError(error: unknown): void {
	if (
		error instanceof DiscordAPIError &&
		IGNORED_DISCORD_ERRORS.has(Number(error.code))
	) {
		return;
	}
	Sentry.captureException(error);
}

/**
 * Handles automatic moderation by tracking per-user message history and
 * detecting various spam and abuse patterns.
 */
export class ModerationService {
	/** Tracks recent message timestamps per user for rapid-message spam detection */
	private _userMessageHistory: Record<string, number[]> = {};

	/** Tracks the last post time per channel per user for cross-channel spam detection */
	private _channelsPostedIn: Record<string, Record<string, number>> = {};

	/**
	 * Runs all auto-moderation checks against a guild message.
	 *
	 * @param message - The guild message to check.
	 * @param memberJoinTime - Timestamp (ms) when the member joined the guild.
	 * @param currentTime - Current timestamp (ms) used for time-window comparisons.
	 */
	async handleAutoMod(
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
		if (
			await this.checkNitroScam(message, hasMod, lowercaseContent, auditChannel)
		)
			return;

		// Discord.gg link from new member
		if (
			await this.checkDiscordLink(
				message,
				isNewMember,
				lowercaseContent,
				auditChannel,
			)
		)
			return;

		// Generic Google Play spam
		if (await this.checkGooglePlaySpam(message)) return;

		// Racist words - new members only
		if (
			await this.checkRacistWords(
				message,
				isNewMember,
				lowercaseContent,
				auditChannel,
			)
		)
			return;

		// Rapid-message spam - new members only
		if (
			await this.checkRapidMessageSpam(
				message,
				isNewMember,
				hasMod,
				currentTime,
				auditChannel,
			)
		)
			return;

		// Cross-channel spam
		await this.checkCrossChannelSpam(
			message,
			hasMod,
			currentTime,
			auditChannel,
		);
	}

	/**
	 * Detects and bans users posting nitro scam messages.
	 *
	 * @returns true if the message was a nitro scam and was handled.
	 */
	private async checkNitroScam(
		message: Message,
		hasMod: boolean,
		lowercaseContent: string,
		auditChannel: ReturnType<
			NonNullable<Message['guild']>['channels']['cache']['find']
		>,
	): Promise<boolean> {
		if (hasMod) return false;

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
			await message.delete().catch(handleDiscordError);
			await message.member
				?.ban({
					deleteMessageSeconds: 7 * 24 * 60 * 60,
					reason: 'posting nitro scam',
				})
				.catch(console.error);

			if (auditChannel?.isTextBased()) {
				await auditChannel
					.send({
						content: `Banned <@${message.member?.id}> for posting nitro scam. Message content: \`\`\`${content}\`\`\``,
					})
					.catch(console.error);
			}
			return true;
		}

		return false;
	}

	/**
	 * Detects and removes Discord invite links posted by new members.
	 *
	 * @returns true if the message contained a Discord link and was handled.
	 */
	private async checkDiscordLink(
		message: Message,
		isNewMember: boolean,
		lowercaseContent: string,
		auditChannel: ReturnType<
			NonNullable<Message['guild']>['channels']['cache']['find']
		>,
	): Promise<boolean> {
		if (isNewMember && lowercaseContent.includes('discord.gg')) {
			await message.delete().catch(handleDiscordError);
			console.log(`Link posted by ${message.author.username}`);

			await message.member
				?.send('Do not post links to other Discord Servers')
				.catch(handleDiscordError);

			if (auditChannel?.isTextBased()) {
				await auditChannel
					.send({
						content: `Warned <@${message.member?.id}> for posting links to a different Discord server.`,
					})
					.catch(console.error);
			}
			return true;
		}

		return false;
	}

	/**
	 * Detects and removes generic Google Play spam messages.
	 *
	 * @returns true if the message was Google Play spam and was handled.
	 */
	private async checkGooglePlaySpam(message: Message): Promise<boolean> {
		if (
			message.content.includes(
				'Checkout this game I am playing https://play.google.com',
			)
		) {
			await message.delete().catch(handleDiscordError);
			return true;
		}

		return false;
	}

	/**
	 * Detects and bans new members posting racist words.
	 *
	 * @returns true if the message contained racist words and was handled.
	 */
	private async checkRacistWords(
		message: Message,
		isNewMember: boolean,
		lowercaseContent: string,
		auditChannel: ReturnType<
			NonNullable<Message['guild']>['channels']['cache']['find']
		>,
	): Promise<boolean> {
		if (!isNewMember) return false;

		for (const word of AUTO_BAN_WORDS) {
			if (lowercaseContent.includes(word)) {
				const content = message.content;
				await message.delete().catch(handleDiscordError);

				await message.member
					?.send(
						'You have been banned from the Clicker Heroes Discord for posting racist comments.',
					)
					.catch(handleDiscordError);

				await message.member
					?.ban({
						deleteMessageSeconds: 7 * 24 * 60 * 60,
						reason: 'Posted racist comments',
					})
					.catch(console.error);

				if (auditChannel?.isTextBased()) {
					await auditChannel
						.send({
							content: `Banned <@${message.member?.id}> for posting racist comments. Message content: \`\`\`${content}\`\`\``,
						})
						.catch(console.error);
				}
				return true;
			}
		}

		return false;
	}

	/**
	 * Detects and bans new members sending messages too rapidly.
	 *
	 * @returns true if the user was detected as a rapid-message spammer and was handled.
	 */
	private async checkRapidMessageSpam(
		message: Message,
		isNewMember: boolean,
		hasMod: boolean,
		currentTime: number,
		auditChannel: ReturnType<
			NonNullable<Message['guild']>['channels']['cache']['find']
		>,
	): Promise<boolean> {
		if (!isNewMember || hasMod) return false;

		const userId = message.author.id;
		const history = this._userMessageHistory[userId] ?? [];
		history.push(currentTime);

		if (history.length > config.moderation.spamMessageCount) {
			const trimmed = history.slice(-config.moderation.spamMessageCount);
			this._userMessageHistory[userId] = trimmed;

			const oldest = trimmed[0];
			const newest = trimmed[trimmed.length - 1];

			if (
				oldest !== undefined &&
				newest !== undefined &&
				oldest - newest > -config.moderation.spamWindowMs
			) {
				const content = message.content;
				await message.delete().catch(handleDiscordError);
				await message.member
					?.send('You have been banned for spamming')
					.catch(handleDiscordError);
				await message.member
					?.ban({
						deleteMessageSeconds: 7 * 24 * 60 * 60,
						reason: 'spamming',
					})
					.catch(console.error);

				if (auditChannel?.isTextBased()) {
					await auditChannel
						.send({
							content: `Banned <@${message.member?.id}> for spamming (posting ${config.moderation.spamMessageCount} messages within ${config.moderation.spamWindowMs / 1000} seconds) Message content: \`\`\`${content}\`\`\``,
						})
						.catch(console.error);
				}
				return true;
			}
		} else {
			this._userMessageHistory[userId] = history;
		}

		return false;
	}

	/**
	 * Detects and bans users posting to 4+ different channels within 10 seconds.
	 */
	private async checkCrossChannelSpam(
		message: Message,
		hasMod: boolean,
		currentTime: number,
		auditChannel: ReturnType<
			NonNullable<Message['guild']>['channels']['cache']['find']
		>,
	): Promise<void> {
		if (hasMod) return;

		const userId = message.author.id;
		const channelId = message.channel.id;

		const userChannels = this._channelsPostedIn[userId] ?? {};
		let channelKeys = Object.keys(userChannels);

		userChannels[channelId] = currentTime;

		if (channelKeys.length > 3) {
			const oldestKey = channelKeys[0];
			if (oldestKey) delete userChannels[oldestKey];
			channelKeys = Object.keys(userChannels);
		}

		this._channelsPostedIn[userId] = userChannels;

		const timestamps = channelKeys
			.map((k) => userChannels[k] as number)
			.sort((a, b) => a - b);

		if (timestamps.length >= 4) {
			const first = timestamps[0];
			const last = timestamps[timestamps.length - 1];

			if (first !== undefined && last !== undefined && first - last > -10_000) {
				await message.delete().catch(handleDiscordError);
				await message.member
					?.send('You have been banned for spamming')
					.catch(handleDiscordError);
				await message.member
					?.ban({
						deleteMessageSeconds: 7 * 24 * 60 * 60,
						reason: 'spamming',
					})
					.catch(console.error);

				if (auditChannel?.isTextBased()) {
					await auditChannel
						.send({
							content: `Banned <@${message.member?.id}> for spamming (posting to 4 different channels within 10 seconds). Message content: \`\`\`${message.content}\`\`\``,
						})
						.catch(console.error);
				}
			}
		}
	}
}
