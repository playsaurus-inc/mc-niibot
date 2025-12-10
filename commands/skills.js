const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skills')
		.setDescription('Info on skill usage'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Skills are the mechanic on the right of heroes, providing damage/gold bonuses. Skills are important only toward the end of an ascension when using an active or hybrid build, and should be used as Lucky Strikes(LS)+Golden Clicks(GC)+Energize+Reload(ER) before skills are infinite(cooldown < duration).\nAfter waiting out the duration of the first wave of LS+GC+ER, use all skills for maximum damage and gold gain until you fail a boss or have no more skills to use. Ascend.',
		});
	},
};
