const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('why')
		.setDescription('Why things are the way they are'),

	async execute(interaction) {
		await interaction.reply({
			content: 'Because you touch yourself at night.',
		});
	},
};
