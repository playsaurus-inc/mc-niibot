const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fatgas')
		.setDescription('First Ascensions That Gain Ancient Souls'),

	async execute(interaction) {
		await interaction.reply({
			content: 'First Ascensions That Gain Ancient Souls',
			ephemeral: false,
		});
	},
};
