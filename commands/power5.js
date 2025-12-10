const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('power5')
		.setDescription('Usage of power5 heroes'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"Before being able to afford regilding and after getting Frostleaf's final upgrade, you should level **Treebeast, Ivan, Brittany, Samurai, or Seer.**\nThese 5 heroes have the most base/upgrade damage. They need to be level 1000+ for a 10x multiplier.\nPick the one above level 1000 with the most gilds, and in the case of a tie, pick any. If you can afford regilding but haven't reached Atlas's gild point you should regild to Samurai.\nOnce Samurai is level 2425, you can level Atlas to 725 and start using [the gild chart](<https://www.reddit.com/r/ClickerHeroes/comments/868uh3/10e11_hero_gilding_chart/>).",
		});
	},
};
