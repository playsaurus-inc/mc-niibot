const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('glossary')
		.setDescription('Reddit glossary link'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content: '<https://www.reddit.com/r/ClickerHeroes/wiki/glossary>',
		});
	},
};
