import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder().setName('faq').setDescription('link to FAQ'),

	async execute(interaction) {
		await interaction.reply({
			content: '<https://www.reddit.com/r/ClickerHeroes/wiki/index>',
		});
	},
};
