const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Mods are the rules.'),

	async execute(interaction) {
		await interaction.reply({
			content: 'Mods **are** the rules.',
			ephemeral: false,
		});
	},
};
