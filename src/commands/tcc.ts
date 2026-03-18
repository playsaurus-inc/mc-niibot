import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('tcc')
		.setDescription('Treasure Chest Chance'),

	async execute(interaction) {
		await interaction.reply({
			content: "Treasure Chest Chance. It's usually 1% anyway. No big deal.",
		});
	},
};
