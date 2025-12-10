const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tcc')
		.setDescription('Treasure Chest Chance'),

	async execute(interaction) {
		await interaction.reply({
			content: "Treasure Chest Chance. It's usually 1% anyway. No big deal.",
		});
	},
};
