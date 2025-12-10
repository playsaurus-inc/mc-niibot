const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascend')
		.setDescription('When to ascend?'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Ascend whenever you reach zone 130 or fail a boss, whichever happens later',
		});
	},
};
