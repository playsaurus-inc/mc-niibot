const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thanksbot')
		.setDescription("you're welcome video"),

	async execute(interaction) {
		await interaction.reply({
			content: 'https://www.youtube.com/watch?v=79DijItQXMM',
			ephemeral: false,
		});
	},
};
