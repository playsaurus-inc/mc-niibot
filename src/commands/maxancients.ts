import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('maxancients')
		.setDescription('Ancients with an effect cap'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Ancients reaching their maximum effect at level:\nChronos: 1101\nVaagur: 1440\nKuma: 1498\nAtman: 2880\nDogcog & Revolc: 3743\nFortuna: 14972\nBubos & Dora: 18715',
		});
	},
};
