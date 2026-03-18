import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('desc')
		.setDescription('Read the channel description!'),

	async execute(interaction) {
		await interaction.reply({ content: 'Read the channel description!' });
	},
};
