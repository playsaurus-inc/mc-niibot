const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('irisexp')
		.setDescription('The reason why iris was removed'),

	async execute(interaction) {
		const { channel, options } = interaction;

		await interaction.reply({
			content:
				"Iris was removed in order to compensate for HS rewards growing exponentially. If Iris was to be added back into the game, the HS rewards from every primal would have to be nerfed in the same way they were buffed in the 1.0 patch. So we would be back to shorter runs for less HS. If Iris was to be added with the current rewards, optimal play would be extremely short runs, which would require you to pay 24/7 attention to the game. Kumawakamaru's bonus was long term increased and timelapse progresses through zones in order to increase the progress a bit with the removal of Iris.",
		});
	},
};
