import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('lister')
		.setDescription('Clicker lister'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'<https://graceoflives.github.io/clicker-lister/>\nadd 3 backticks before and after the output e.g\n\\`\\`\\`<output>\\`\\`\\`',
		});
	},
};
