const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rubies')
		.setDescription('Info on rubies'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Rubies can be collected from Clans, Clickables, as well as Mercs. They are best spent first on 4 Auto Clickers. After this you save up for Timelapses and Quick Ascensions. (TLs are used zone 50K+, QAs used around zone 250K+)\n\nAdditional autoclickers and 2x damage are nice, but no priority. First make sure you have 33k rubies for the QA rush, and enough for TLs.\nNever spend rubies on gilds, relics or instant merc hires.',
		});
	},
};
