import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('google')
		.setDescription('link to google'),

	async execute(interaction) {
		await interaction.reply({ content: 'https://www.google.com/' });
	},
};
