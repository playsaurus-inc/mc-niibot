const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('earlyheroes')
		.setDescription('How to level heroes earlygame?'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Level the highest hero to 10 and buy the upgrade, then get the previous one to 25 for the next upgrade, then the one before to 50 and so on, till they run out of upgrades (no need to level them any further, for now). Then move to the next hero. Around Beastlord, you can start to get the best hero to 25 before moving to the next and you can get Grant to 50 before you save up for Frostleaf.\nOnce at Frostleaf, continue with /power5.',
		});
	},
};
