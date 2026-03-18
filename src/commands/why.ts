import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('why')
		.setDescription('Why things are the way they are'),

	async execute(interaction) {
		await interaction.reply({
			content: 'Because you touch yourself at night.',
		});
	},
};
