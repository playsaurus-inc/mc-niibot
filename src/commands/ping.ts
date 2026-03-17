import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),

	async execute(interaction) {
		await interaction.reply({ content: 'Pong!' });
	},
};
