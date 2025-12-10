const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('faq').setDescription('link to FAQ'),

	async execute(interaction) {
		await interaction.reply({
			content: '<https://www.reddit.com/r/ClickerHeroes/wiki/index>',
			ephemeral: false,
		});
	},
};
