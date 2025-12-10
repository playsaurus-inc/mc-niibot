const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ancients')
		.setDescription('What are ancients?'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"Your ancients are a branch of new 'hero' type deities that can be leveled and bought with Hero Souls. Each one does a different function and overall they can affect your ascensions very much. Some Ancients are affected by Outsiders(eg. Atman) and others add direct damage etc.",
		});
	},
};
