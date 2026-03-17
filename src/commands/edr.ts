import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('edr')
		.setDescription('sarcastic EDR response'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'30 Clicks over a 10 hour period to get half a boss worth dps?\nSounds like a good use of my time.',
		});
	},
};
