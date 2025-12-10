const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('google')
		.setDescription('link to google'),

	async execute(interaction) {
		const { channel, options } = interaction;
		await interaction.reply({
			content: 'https://www.google.com/',
			ephemeral: false,
		});
	},
};
