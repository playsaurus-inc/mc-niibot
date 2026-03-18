import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('consoleas')
		.setDescription('Console AS google sheet'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'**For console use only**\n<https://docs.google.com/spreadsheets/d/1m09HoNiLW-7t96gzguG9tU_HHaRrDrtMpAoAuukLB4w/edit#gid=0>',
		});
	},
};
