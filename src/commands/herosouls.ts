import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('herosouls')
		.setDescription('Info on HS'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Hero Souls (HS) are a currency gained mainly from Primal Bosses, as well as clans and mercenary quests. Each HS provides a 10% additive dps gain, and can be used to level/purchase ancients. Ancient benefits are multiplicative with added Hero Souls dps.',
		});
	},
};
