import type {
	AutocompleteInteraction,
	Awaitable,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export interface BotCommand {
	data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
	autoComplete?: (interaction: AutocompleteInteraction) => Awaitable<void>;
}
