const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tp')
		.setDescription('Info on transcendence power'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				"TP or Transcendence Power is a function in the game that provides exponentially more HS from primal bosses. The TP cap is 25%, it's increased by gaining AS (following `TP = 25-23*e^(-0.0003*AS)`).\nIncreasing TP is essential to get higher zones, it's the main source of HS.",
		});
	},
};
