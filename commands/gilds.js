const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gilds')
		.setDescription('Info on early gilding, and gildchart link'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				"- Don't even touch gilds during the first two ascensions.\n- Once you stop instakilling on the second one, open them all at once, at least some will fall on your best hero which is enough to keep going, all without spending HS for regilding.\n- When you can level Atlas to 725, start using the [gild chart](<https://www.reddit.com/r/ClickerHeroes/comments/868uh3/10e11_hero_gilding_chart/>). Limit to moving only a few gilds at first, move all gilds once easily affordable.",
		});
	},
};
