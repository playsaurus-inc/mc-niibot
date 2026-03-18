import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('fatgas')
		.setDescription('First Ascensions That Gain Ancient Souls'),

	async execute(interaction) {
		await interaction.reply({
			content: 'First Ascensions That Gain Ancient Souls',
		});
	},
};
