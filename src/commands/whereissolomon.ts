import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('whereissolomon')
		.setDescription('Where did solomon go?'),

	async execute(interaction) {
		await interaction.reply({ content: '404 Ancient Not Found' });
	},
};
