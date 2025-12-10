const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inv')
		.setDescription('the official link to the discord server'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Official invite to this Discord server: \nhttps://discord.gg/playsaurus',
			ephemeral: false,
		});
	},
};
