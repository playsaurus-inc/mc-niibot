import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('fant')
		.setDescription('First Ascension New Transcension'),

	async execute(interaction) {
		await interaction.reply({ content: 'First Ascension New Transcension' });
	},
};
