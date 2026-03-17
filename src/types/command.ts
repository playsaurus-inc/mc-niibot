import type {
	AutocompleteInteraction,
	Awaitable,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';

export interface BotCommand {
	data:
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
	execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
	autoComplete?: (interaction: AutocompleteInteraction) => Awaitable<void>;
}
