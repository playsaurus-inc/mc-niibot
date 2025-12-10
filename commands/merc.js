const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('merc')
		.setDescription('Info on mercenaries'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Mercenaries are a mechanic unlocked after ascending. They can be sent on quests for rubies, hero souls, relics, skill activations, and recruitment for more (max 5 in total) mercs. Mercs level up once every 24 hours of questing and have a 20% chance to die every 24 hours of questing. They can be revived with rubies or extra lives (if the mercs has them).\nMercs are most useful for gaining rubies, generally ruby quests of about 1 to 8 hours are optimal. More info, including math on what quests are best and when to revive mercs: <https://www.reddit.com/r/ClickerHeroes/comments/ahupf4/ch1_single_mercenary_strategies_for_quests_revive/>',
		});
	},
};
