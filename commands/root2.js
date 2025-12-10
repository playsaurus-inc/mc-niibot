const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('root2')
		.setDescription('Info and links on root2'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Clicker Heroes Root 2 is a mod of CH made by Nalk and Sioist that reworks heroes, transcendence, and adds a few QOL additions. See https://discord.com/channels/104739787872694272/430434656668614676. A full [list of changes](<https://www.reddit.com/r/ClickerHeroes/comments/8cgnjc/clicker_heroes_root_2_v141421/>) and the [Root2 FAQ](<https://www.reddit.com/r/ClickerHeroes/wiki/faqroot2/>) are on reddit.',
		});
	},
};
