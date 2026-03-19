import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Sentry from '@sentry/node';
import {
	Client,
	Collection,
	Events,
	GatewayIntentBits,
	type Interaction,
	type Message,
	MessageFlags,
	Partials,
	PermissionsBitField,
} from 'discord.js';
import { config } from './config.ts';
import { deployCommands } from './deploy-commands.ts';
import {
	handleDiscordError,
	ModerationService,
} from './services/moderation.ts';
import { RoleService } from './services/roles.ts';
import { SaveService, UPLOADS_DIR } from './services/saves.ts';
import type { BotCommand } from './types/command.ts';
import { BanReason } from './types/save.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface BotOptions {
	token: string;
	clientId: string;
	guildId: string;
}

/**
 * Main bot class that orchestrates Discord event handling, command loading,
 * and delegates to specialized services for saves, roles, and moderation.
 */
export class Bot {
	private _client: Client;
	private _saveService: SaveService;
	private _roleService!: RoleService;
	private _moderationService: ModerationService;

	constructor(private _options: BotOptions) {
		this._client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.DirectMessages,
			],
			partials: [Partials.Channel],
			allowedMentions: {
				parse: ['users', 'roles'],
				repliedUser: true,
			},
		});

		this._saveService = new SaveService();
		this._moderationService = new ModerationService();
	}

	/**
	 * Initializes services, loads and deploys commands, binds event handlers,
	 * and logs the bot into Discord.
	 */
	async start(): Promise<void> {
		this._client.commands = new Collection<string, BotCommand>();

		// RoleService needs the client, so it's created here after the client is ready
		this._roleService = new RoleService(
			this._client,
			this._options.guildId,
			this._saveService,
		);

		const commands = await this.loadCommands();
		for (const command of commands) {
			this._client.commands.set(command.data.name, command);
		}

		await deployCommands(
			commands,
			this._options.clientId,
			this._options.guildId,
			this._options.token,
		).catch(console.error);

		this._saveService.loadAll();
		this._saveService.startAutoSync();

		this._client.once(Events.ClientReady, () => this.onReady());
		this._client.on(Events.InteractionCreate, (interaction) =>
			this.onInteractionCreate(interaction),
		);
		this._client.on(Events.MessageCreate, (msg) => this.onMessageCreate(msg));
		this._client.on('error', (error) =>
			console.error('Discord client error:', error),
		);

		await this._client.login(this._options.token);
	}

	/**
	 * Dynamically loads all command modules from the commands directory.
	 */
	private async loadCommands(): Promise<BotCommand[]> {
		const commandsPath = path.join(__dirname, 'commands');
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.ts'));
		const commands: BotCommand[] = [];

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const loaded = (await import(filePath)) as {
				command?: BotCommand;
			};

			if (
				loaded.command &&
				'data' in loaded.command &&
				'execute' in loaded.command
			) {
				commands.push(loaded.command);
			} else {
				console.warn(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
				);
			}
		}

		return commands;
	}

	/**
	 * Handles the ClientReady event, logging that the bot is online.
	 */
	private onReady(): void {
		console.log(`${this._client.user?.username} is online!`);
	}

	/**
	 * Handles incoming interactions (slash commands and autocomplete).
	 */
	private async onInteractionCreate(interaction: Interaction): Promise<void> {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(
					`No command matching ${interaction.commandName} was found.`,
				);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				Sentry.captureException(error, {
					extra: { command: interaction.commandName },
				});

				const content = 'There was an error while executing this command!';
				if (interaction.replied || interaction.deferred) {
					await interaction
						.followUp({ content, flags: MessageFlags.Ephemeral })
						.catch(console.error);
				} else {
					await interaction
						.reply({ content, flags: MessageFlags.Ephemeral })
						.catch(console.error);
				}
			}
		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(
					`No command matching ${interaction.commandName} was found.`,
				);
				return;
			}

			try {
				await command.autoComplete?.(interaction);
			} catch (error) {
				console.error(error);
				Sentry.captureException(error, {
					extra: { command: interaction.commandName },
				});
			}
		}
	}

	/**
	 * Top-level message handler that delegates to DM, recruitment, and auto-mod logic.
	 */
	private async onMessageCreate(message: Message): Promise<void> {
		if (message.author.bot) return;

		try {
			if (message.channel.isDMBased()) {
				await this.handleDm(message);
				return;
			}

			if (!message.guild || !message.member) return;
			if (message.guild.id !== this._options.guildId) return;

			const memberJoinTime = message.member.joinedTimestamp ?? 0;
			const currentTime = Date.now();

			await this.handleRecruitmentChannel(message);
			await this._moderationService.handleAutoMod(
				message,
				memberJoinTime,
				currentTime,
			);
		} catch (error) {
			console.error('Unhandled error in messageCreate:', error);
			Sentry.captureException(error);
		}
	}

	/**
	 * Processes save file uploads received via DM for role assignment.
	 */
	private async handleDm(message: Message): Promise<void> {
		if (this._saveService.isBannedFromRole(message.author.id)) {
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
				throw new Error(
					`Failed to download attachment: ${response.statusText}`,
				);

			const buffer = Buffer.from(await response.arrayBuffer());
			await fsPromises.writeFile(filePath, buffer);

			const rawData = await fsPromises.readFile(filePath, 'utf8');

			if (!rawData.includes('7a990') && !rawData.includes('7e8bb')) return;

			const saveData = SaveService.decodeSave(rawData);
			if (!saveData) {
				await message.reply(
					'Your save could not be read, be sure to copy the full text of the save file and try again.',
				);
				return;
			}

			const highestHeroUnlocked = SaveService.getHighestHeroUnlocked(saveData);
			const rubies = saveData.rubies;
			const gameUID = saveData.uniqueId;

			const saves = this._saveService.getSaves();
			let banReason: BanReason | null = null;
			let matchedUserID: string | undefined;

			for (const entry of saves.saves) {
				if (!entry.gameUID) continue;
				if (entry.gameUID === gameUID && entry.userID !== message.author.id) {
					matchedUserID = entry.userID;
					banReason = BanReason.DuplicateSave;
					break;
				}
			}

			if (rubies > config.moderation.maxRubies) {
				banReason = BanReason.ExcessiveRubies;
			}

			if (banReason) {
				this._saveService.banFromRole(
					message.author.id,
					message.author.username,
					banReason,
				);
				await message.reply(
					'Your save was determined to be illegitimate either because you cheated or used a different users save. You will no longer be eligible for ranks on the server.',
				);

				const guild = message.client.guilds.cache.get(config.guildId);
				const targetMember = guild?.members.cache.get(message.author.id);
				if (targetMember) {
					await targetMember.roles.set([]).catch(console.error);
				}

				const auditChannel = guild?.channels.cache.find(
					(ch) => ch.name === 'audit-log',
				);
				if (auditChannel?.isTextBased()) {
					let reasonText: string;
					switch (banReason) {
						case BanReason.ExcessiveRubies:
							reasonText = `having ${rubies.toLocaleString()} rubies (max: ${config.moderation.maxRubies.toLocaleString()})`;
							break;
						case BanReason.DuplicateSave:
							reasonText = `submitting a duplicate save (gameUID: ${gameUID})`;
							break;
						default: {
							const _exhaustive: never = banReason;
							reasonText = `unknown reason: ${_exhaustive}`;
						}
					}
					await auditChannel
						.send({
							content: `Banned <@${message.author.id}> from role assignment for ${reasonText}.`,
						})
						.catch(console.error);
				}

				this._saveService.addBannedSave({
					userID: message.author.id,
					username: message.author.username,
					gameUID,
					rubies,
					matchedUserID,
					userBanned: true,
					bannedAt: new Date().toISOString(),
					reason: banReason,
					save: rawData,
				});
			} else {
				this._saveService.addSave({
					userID: message.author.id,
					username: message.author.username,
					gameUID,
					createdAt: new Date().toISOString(),
					save: rawData,
				});
				await this._roleService.setRole(highestHeroUnlocked, message);
			}
		} finally {
			await fsPromises
				.unlink(filePath)
				.catch((err) => console.error('Failed to clean up upload:', err));
		}
	}

	/**
	 * Enforces the "Recruiting:" prefix format in the recruitment channel,
	 * deleting non-conforming messages and notifying the user.
	 */
	private async handleRecruitmentChannel(message: Message): Promise<void> {
		if (message.channel.id !== config.channels.recruitment) return;
		if (message.content.toLowerCase().startsWith('recruiting:')) return;
		if (!message.member) return;
		if (
			message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)
		)
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
				if (fallback?.isSendable())
					await fallback.send(messageText).catch(console.error);
			});

		await message.delete().catch(handleDiscordError);
	}
}
