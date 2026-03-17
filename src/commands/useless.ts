import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('useless')
		.setDescription('Useless present drops'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Presents can drop forge coals, and used to drop bloop coins, both of which are useless.',
		});
	},
};
