import { REST, Routes } from 'discord.js';
import type { BotCommand } from './types/command.ts';

/**
 * Registers slash commands with the Discord guild via the REST API.
 */
export async function deployCommands(
	commands: BotCommand[],
	clientId: string,
	guildId: string,
	token: string,
): Promise<void> {
	const rest = new REST({ version: '10' }).setToken(token);
	const body = commands.map((cmd) => cmd.data.toJSON());

	console.log(`Started refreshing ${body.length} application (/) commands.`);

	const data = (await rest.put(
		Routes.applicationGuildCommands(clientId, guildId),
		{ body },
	)) as unknown[];

	console.log(`Successfully reloaded ${data.length} application (/) commands.`);
}
