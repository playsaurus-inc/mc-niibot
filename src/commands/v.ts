import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('v')
		.setDescription('Value-level ancients with V'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"***YOU CAN HOLD 'V' AND CLICK TO LEVEL UP ANCIENTS FASTER!!!***",
		});
	},
};
