const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sant')
		.setDescription('Second Ascension New Transcension'),

	async execute(interaction) {
		await interaction.reply({
			content: 'Second Ascension New Transcension',
			ephemeral: false,
		});
	},
};
