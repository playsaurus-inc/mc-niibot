const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('v')
		.setDescription('Value-level ancients with V'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				"***YOU CAN HOLD 'V' AND CLICK TO LEVEL UP ANCIENTS FASTER!!!***",
		});
	},
};
