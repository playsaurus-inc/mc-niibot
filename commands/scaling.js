const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scaling')
		.setDescription('Info on zone scaling'),

	async execute(interaction) {
		await interaction.reply({
			content:
				'Zone stat changes applied every 500 zones:\n- MPZ: +0.1\n- Boss Timer: -2 seconds\n- TCC: *0.994 (multiplicative, exact value `e^(-0.006)`)\n- Boss Health: +0.4\n- PBC: -2',
		});
	},
};
