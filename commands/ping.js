const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({ content: 'Pong!' });
	},
};
