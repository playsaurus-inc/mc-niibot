const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whatareclans')
		.setDescription('Explains basic functionality of clans'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				'Clans are the best source of rubies, unlocked after zone 50. Clans allow members to run daily attacks by attacking an “immortal” boss. When your clan defeats the Immortal, everyone earns Rubies and Immortal Souls. You can spend these Souls to level up your class, which increases the damage you deal to the Immortal. Classes are each the same, except a minor damage bonus of 1.25x on days the immortal would be weak to that class.\nClans also have a legacy immortal, giving Hero Souls, but after transcending, this mechanic is rarely useful.',
		});
	},
};
