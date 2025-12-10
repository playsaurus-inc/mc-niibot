const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('desc')
		.setDescription('Read the channel description!'),

	async execute(interaction) {
		await interaction.reply({
			content: 'Read the channel description!',
			ephemeral: false,
		});
	},
};
