const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('theseancients')
		.setDescription('List of significant ancients to first summon'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Relevant ancients to primarily summon are: Kumawakamaru, Argaiv, Mimzee, Mammon, Atman.\nWhen active, also very important are: Juggernaut, Fragsworth, Bhaal, Pluto\nWith idle, also buy: Siyalatas, Libertas (and Nogardnit if you have an autoclicker, but in that case, active would be recommended)\n\nWhen you have enough HS to summon all ancients, a button appears to do so. It is recommended to use this once you have 1e6 (1M) hero souls.\nUse an [Ancient Calculator](<https://zuils.github.io/ClickerHeroesCalculator/>) to level these ancients.',
		});
	},
};
