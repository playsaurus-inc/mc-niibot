const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('pong').setDescription('Ping!'),

	async execute(interaction) {
		await interaction.reply({ content: 'Ping!' });
	},
};
