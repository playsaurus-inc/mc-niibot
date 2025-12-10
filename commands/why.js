const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('why')
		.setDescription('Why things are the way they are'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content: 'Because you touch yourself at night.',
		});
	},
};
