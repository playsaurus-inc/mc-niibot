const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('primalbug')
		.setDescription('Info on primal bug'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"The e12 version of the game has a bug that involves getting 0 Hero Souls from Primal Bosses for the rest of the ascension if you fight a Legacy Immortal Boss. It's recommended to wait until after the ascension is basically over to fight them, and if you end up affected by the bug, ascending is the only option.(Quick Ascensions if above ~250K HZE or merc quests may help)",
		});
	},
};
