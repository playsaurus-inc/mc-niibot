const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ios')
		.setDescription('why the import button isnt on IOS'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Apple guidelines forced Playsaurus to remove the import button on IOS CH.',
			ephemeral: false,
		});
	},
};
