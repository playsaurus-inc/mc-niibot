const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('outsiders')
		.setDescription('What are outsiders?'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'The outsiders are essentially super-ancients, which have varied abilities to enhance game play throughout your next transcendence; They are hired and leveled with Ancient Souls.\nOutsider Calculator\nhttps://driej.github.io/Clicker-Heroes-Outsiders/',
		});
	},
};
