const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clickmas')
		.setDescription('Info on presents, gained from clickmas event'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'**Presents** can be gained from clicking the bauble and mercenary quests. They give:\n-**Coals, Relics** (coals are useless, relics usually too)\n-**Label makers** (random new name for mercenary, nice for the Leeroy Jenkins achievement)\n-**Rubies** (gaining rubies from presents decreases the chance of getting another ruby. So farming presents for rubies is not effective long-term)\n-**Autoclicker skins** (1/1k chance for the Snowman, 1/100k chance for the Turkey and the Zombie)\n-**Spiked nog** Nogs give +1 cps for +1 hour, both of which stack. So 10 nogs give +10 cps during 10 hours, and 72 nogs give +72 cps for 3 days.\n**If you care about CPS, save Nogs up and use them all at once** for maximal gained clicks.\nAdditionally for clans: The CPS from Spiked Nogs also affect the immortal raids. In some cases this might help for earlier immortal levelups or beating the immortal without help.\n\nFarming presents can be considered if you want the Autoclicker skins or Label makers for Leeroy.\n\n:gift: :christmas_tree::star2: **Happy Clickmas!** :star2: :christmas_tree: :gift:',
		});
	},
};
