import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('thanksbot')
		.setDescription("you're welcome video"),

	async execute(interaction) {
		await interaction.reply({
			content: 'https://www.youtube.com/watch?v=79DijItQXMM',
		});
	},
};
