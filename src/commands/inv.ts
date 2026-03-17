import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('inv')
		.setDescription('the official link to the discord server'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Official invite to this Discord server: \nhttps://discord.gg/playsaurus',
		});
	},
};
