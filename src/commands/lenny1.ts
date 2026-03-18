import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder()
		.setName('lenny')
		.setDescription('lenny face')
		.addStringOption((option) =>
			option
				.setName('emoji')
				.setDescription('The lenny face to use')
				.setRequired(true)
				.addChoices(
					{ name: 'normal', value: '( ͡° ͜ʖ ͡°)' },
					{ name: 'brick', value: '( ͡° ͜ʖ├┬┴┬' },
					{ name: 'multi', value: '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)' },
				),
		),

	async execute(interaction) {
		const value = interaction.options.getString('emoji', true);
		await interaction.reply({ content: value });
	},
};
