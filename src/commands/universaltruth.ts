import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('universaltruth')
		.setDescription('A universal truth'),

	async execute(interaction) {
		await interaction.reply({ content: 'People are idiots.' });
	},
};
