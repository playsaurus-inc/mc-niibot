import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.js';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('glossary')
		.setDescription('Reddit glossary link'),

	async execute(interaction) {
		await interaction.reply({
			content: '<https://www.reddit.com/r/ClickerHeroes/wiki/glossary>',
		});
	},
};
