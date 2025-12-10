const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('relics')
		.setDescription('Info on relics'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Relics are a mechanic in Clicker Heroes that provide levels to the specified ancient. Relic level is based on zone progress, forge cores are based on relic level/rarity. When relics show 0% it is a result of limited precision meaning your actual ancient level is too high to make the relic worthwhile. When this begins to happen relics have become useless as they will be for the majority of the game.',
		});
	},
};
