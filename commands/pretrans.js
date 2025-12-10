const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pretrans')
		.setDescription('Ancients before transcending'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"Juggernaut is optimal if you have an autoclicker; place it on the monster for combo. Level Jugg when HS is more than his (cost × level).\nOtherwise use idle: get Siyalatas and Libertas, level them equally. Level both up when HS is more than Siya's (cost × level).\nDon't worry about any other ancients until you reach 300 and transcend.",
		});
	},
};
