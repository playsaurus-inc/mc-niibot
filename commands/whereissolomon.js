const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whereissolomon')
		.setDescription('Where did solomon go?'),

	async execute(interaction) {
		await interaction.reply({ content: '404 Ancient Not Found' });
	},
};
