const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('spam').setDescription("Don't spam"),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content: 'Do this shit in <#259897497554649098>!',
		});
	},
};
