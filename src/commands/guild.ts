import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder().setName('guild').setDescription("It's gilds"),

	async execute(interaction) {
		await interaction.reply({
			content: "It's gilds <:kappa:707958927253569556>",
		});
	},
};
