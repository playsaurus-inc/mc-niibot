const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rubys')
		.setDescription("it's rubies"),

	async execute(interaction) {
		await interaction.reply({
			content: "It's rubies <:kappa:707958927253569556>",
			ephemeral: false,
		});
	},
};
