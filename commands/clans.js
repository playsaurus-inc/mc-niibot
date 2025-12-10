const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clans')
		.setDescription('Where to find active clans?'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"Search posts in these places for leaders recruiting new members. If you are looking for clans, please don't make your own posts here.\n<#104740000591024128>\n<https://discord.gg/8nCRdYM>\n<https://www.reddit.com/r/ClickerHeroesRecruit>",
		});
	},
};
