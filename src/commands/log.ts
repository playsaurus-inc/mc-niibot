import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('What is logHS or logGold?'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'logHS or logGold refers to the number after the e in Scientific Notation. Use Scientific Notation.',
		});
	},
};
