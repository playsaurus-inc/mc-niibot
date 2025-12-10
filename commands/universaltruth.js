const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('universaltruth')
		.setDescription('A universal truth'),

	async execute(interaction) {
		await interaction.reply({ content: 'People are idiots.' });
	},
};
