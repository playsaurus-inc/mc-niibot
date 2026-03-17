import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder().setName('spam').setDescription("Don't spam"),

	async execute(interaction) {
		await interaction.reply({
			content: 'Do this shit in <#259897497554649098>!',
		});
	},
};
