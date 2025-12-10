const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timelapse')
		.setDescription('Info on TLs'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				"Timelapses (TLs) are a feature that allows you to warp through zones by paying rubies.\nAutoclickers don't click during TLs, hence idle is forced. Their caps are:\n8 hr: 36K zones max, 100 rubies\n24 hr: 108K zones max, 200 rubies\n48hr: 216K zones max, 300 rubies\n168hr: 756K zones max, 500 rubies\n\nTo calculate optimal TLs, and see what zone they should give, use [the TL calc](<https://driej.github.io/Clicker-Heroes-Timelapses/>)",
		});
	},
};
