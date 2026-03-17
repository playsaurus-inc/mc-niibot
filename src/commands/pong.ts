import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder().setName('pong').setDescription('Ping!'),

	async execute(interaction) {
		await interaction.reply({ content: 'Ping!' });
	},
};
