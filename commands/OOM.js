const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('oom')
		.setDescription('order(s) of magnitude'),

	async execute(interaction) {
		const { channel, options } = interaction;
		await interaction.reply({
			content: 'Order(s) of Magnitude',
			ephemeral: false,
		});
	},
};
