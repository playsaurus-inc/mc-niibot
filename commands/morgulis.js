const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('morgulis')
		.setDescription('What does morgulis do?'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Morgulis is an ancient that serves as essentially a bank for your Hero Souls. Whatever you put in has interest applied to it, leading to a 1.1x damage multiplier given enough HS is put in.',
		});
	},
};
