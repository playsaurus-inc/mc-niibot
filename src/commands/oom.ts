import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('oom')
		.setDescription('order(s) of magnitude'),

	async execute(interaction) {
		await interaction.reply({ content: 'Order(s) of Magnitude' });
	},
};
