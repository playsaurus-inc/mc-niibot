
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rubies")
        .setDescription("info on rubies"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Rubies can be collected from Clickables, Clans, as well as Mercs. They are best spent first on 2 Auto Clickers (ACs), then 2x damage(optional), 3 more ACs, and after this you save up for Time Lapses and Quick Ascensions.(TLs are used zone 50K+, QAs used around zone 250K+)" })
    }
}
