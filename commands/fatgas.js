const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fatgas')
		.setDescription('First Ascensions That Gain Ancient Souls'),

	async execute(interaction) {
		const { channel, options } = interaction;
		await interaction.reply({
			content: 'First Ascensions That Gain Ancient Souls',
			ephemeral: false,
		});
	},
};
