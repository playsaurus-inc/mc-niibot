import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Mods are the rules.'),

	async execute(interaction) {
		await interaction.reply({ content: 'Mods **are** the rules.' });
	},
};
