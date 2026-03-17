import fs from 'node:fs';
import path from 'node:path';
import {
	Client,
	Collection,
	Events,
	GatewayIntentBits,
	Partials,
} from 'discord.js';
import { deployCommands } from './deploy-commands.js';
import { onInteractionCreate } from './events/interactionCreate.js';
import { onMessageCreate } from './events/messageCreate.js';
import { onReady } from './events/ready.js';
import { loadAll, startAutoSync } from './services/saves.js';
import type { BotCommand } from './types/command.js';

interface BotOptions {
	token: string;
	clientId: string;
	guildId: string;
}

function loadCommands(): BotCommand[] {
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith('.js'));
	const commands: BotCommand[] = [];

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const loaded = require(filePath) as { command?: BotCommand };

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

export async function startBot({
	token,
	clientId,
	guildId,
}: BotOptions): Promise<void> {
	const client = new Client({
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

	client.commands = new Collection<string, BotCommand>();

	const commands = loadCommands();
	for (const command of commands) {
		client.commands.set(command.data.name, command);
	}

	await deployCommands(commands, clientId, guildId, token).catch(console.error);

	loadAll();
	startAutoSync();

	client.once(Events.ClientReady, onReady);
	client.on(Events.InteractionCreate, onInteractionCreate);
	client.on(Events.MessageCreate, onMessageCreate);
	client.on('error', (error) => console.error('Discord client error:', error));

	await client.login(token);
}
