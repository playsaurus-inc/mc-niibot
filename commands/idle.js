const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('idle')
		.setDescription('How bad is idle exactly?'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Idle builds make use of the idle status, idle ancient benefits, and the Outsider Xyliqil. The Idle Ancients are Siyalatas, Libertas, and Nogardnit. Nogardnit makes use of Auto Clickers, so you need those as well.\nHowever, idle is far worse than active because it lacks one ancient, lacks the same instant kill speed, and lacks the ability to make use of most skills. Xyliqil is not significant in any way, and is the only unique benefit of idle, meaning active simply brings more to the table for damage.',
		});
	},
};
