const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edr')
		.setDescription('sarcastic EDR response'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'30 Clicks over a 10 hour period to get half a boss worth dps?\nSounds like a good use of my time.',
			ephemeral: false,
		});
	},
};
