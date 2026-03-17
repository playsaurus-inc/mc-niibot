import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('as')
		.setDescription('Outsider calc link'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Ancient Souls or AS should be spent according to <https://driej.github.io/Clicker-Heroes-Outsiders/>, also found in <#207675653091229697>',
		});
	},
};
