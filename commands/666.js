const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('666')
		.setDescription('For the glory of satan of course!'),

	async execute(interaction) {
		await interaction.reply({ content: 'For the glory of satan of course!' });
	},
};
