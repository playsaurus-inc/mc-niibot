const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('How to hard reset'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'To hard reset on PC, open the ingame settings and select the option to reset. Click yes and yes.\nTo hard reset on mobile, close Clicker Heroes, open app settings, clear app data for Clicker Heroes, disable cloud login, relaunch Clicker Heroes, make sure to export the new save to a file so you can import later when you enable cloud login.',
		});
	},
};
