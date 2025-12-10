const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2xdps')
		.setDescription('Info on the ruby-shop 2x damage'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				"Double Damage is a purchasable 2x dps increase from the shop. Due to the exponential increase of the numbers in this game, it's fairly insignificant. Prioritize getting 4 autoclickers, after that buying 2x damage is fine but optional. 2x Damage does not apply to First Ascension New Transcendence (FANT)",
		});
	},
};
