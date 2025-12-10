const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('useless')
		.setDescription('Useless present drops'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Presents can drop forge coals, and used to drop bloop coins, both of which are useless.',
		});
	},
};
