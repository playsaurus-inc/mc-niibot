const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('What is logHS or logGold?'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'logHS or logGold refers to the number after the e in Scientific Notation. Use Scientific Notation.',
		});
	},
};
