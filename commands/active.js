const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('active')
		.setDescription('Basic active guide'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'How to play active:\n1. Buy at least 2 autoclickers, placing one on your hero and rest on the monster\n2. Buy all ancients, and select active in your calculator of choice; level accordingly\n3. Use skills after losing instakill (if not infinite yet use LS+GC, then energize reload, then repeat)',
		});
	},
};
