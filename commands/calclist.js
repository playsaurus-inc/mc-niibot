const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calclist')
		.setDescription('List of common calculators'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'[Ancients, after ascending](<https://zuils.github.io/ClickerHeroesCalculator/>)\n[Outsiders, after transcending](<https://driej.github.io/Clicker-Heroes-Outsiders/>)\n[Future progression (after 1e21 HS)](<https://driej.github.io/clickerheroes-endgame/>)\n[Timelapses for beyond Z50K](<https://driej.github.io/Clicker-Heroes-Timelapses/>)\n[Video guide for the calcs](<https://youtu.be/dQw4w9WgXcQ>)',
		});
	},
};
