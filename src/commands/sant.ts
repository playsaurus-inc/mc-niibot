import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('sant')
		.setDescription('Second Ascension New Transcension'),

	async execute(interaction) {
		await interaction.reply({ content: 'Second Ascension New Transcension' });
	},
};
