import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('mpz')
		.setDescription(
			'Monsters per zone. The fewer, the faster. We want faster.',
		),

	async execute(interaction) {
		await interaction.reply({
			content: 'Monsters per zone. The fewer, the faster. We want faster.',
		});
	},
};
