const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qarush')
		.setDescription('Guide on the QA rush'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"From zone ~250k up to (and including) the first failed boss past 1M, it is better to use Quick Ascensions (QAs), instead of ascending and using TLs to regain most zones.\nIn this 'QA rush' you don't have to ascend at all, but you'll end up using about 66 QAs. This will cost 33k rubies, which you can end up spending in less then a week. So after getting 4 Autoclickers, make sure to save up for this QA rush!\nWhen short on rubies, delay starting with QAs and keep ascending normally, until you have enough rubies for all the remaining QAs.\n\nThe second QA rush comes very quickly after the first one, since the zone 1M transcension doesn't take alot of time to finish. So when you're approaching the first QA rush, consider to save up rubies even after getting 33k.",
		});
	},
};
