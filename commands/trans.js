const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trans')
		.setDescription('When to transcend?'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Ascend until you have more HS than last transcension (when transcend for +0 changes into +1 or more, in trans tab).\nThen ascend another 3 times, then transcend.\nThis works until you have ~24% TP, afterwards use [the outsider calc](<https://driej.github.io/Clicker-Heroes-Outsiders/>)',
		});
	},
};
