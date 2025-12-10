const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('pong').setDescription('Ping!'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({ content: 'Ping!' });
	},
};
