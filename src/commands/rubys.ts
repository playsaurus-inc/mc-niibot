import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('rubys')
		.setDescription("it's rubies"),

	async execute(interaction) {
		await interaction.reply({
			content: "It's rubies <:kappa:707958927253569556>",
		});
	},
};
