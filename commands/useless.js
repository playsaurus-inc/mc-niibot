const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('useless')
		.setDescription('Useless present drops'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Presents can drop forge coals, and used to drop bloop coins, both of which are useless.',
		});
	},
};
