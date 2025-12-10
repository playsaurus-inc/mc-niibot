const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guide')
		.setDescription('General guide link'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'General guide: <https://docs.google.com/document/d/e/2PACX-1vSNZfQsM6Tkofdjjz9om2G7YX9gkxavSicxAwlfZz7eBIQ4xrtvRU4x-vkhBeblGQD_-_7rBkq68oyG/pub>',
		});
	},
};
