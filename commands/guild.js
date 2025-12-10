const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('guild').setDescription("It's gilds"),

	async execute(interaction) {
		await interaction.reply({
			content: "It's gilds <:kappa:707958927253569556>",
			ephemeral: false,
		});
	},
};
