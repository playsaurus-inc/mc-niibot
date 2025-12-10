const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lenny')
		.setDescription('lenny face')
		.addStringOption((option) =>
			option
				.setName('emoji')
				.setDescription('The lenny face to use')
				.setRequired(true)
				.addChoices(
					{ name: 'normal', value: '( ͡° ͜ʖ ͡°)' },
					{ name: 'brick', value: '( ͡° ͜ʖ├┬┴┬' },
					{ name: 'multi', value: '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)' },
				),
		),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content: options._hoistedOptions[0].value,
			ephemeral: false,
		});
	},
};
