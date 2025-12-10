const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('combo')
		.setDescription("Info on Juggernaut's combo"),

	async execute(interaction) {
		await interaction.reply({
			content:
				"Juggernaut's combo lasts 5 minutes after last time you or your autoclicker have clicked monsters. Combo damage does not apply when idle.",
		});
	},
};
