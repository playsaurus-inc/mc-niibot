
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sant")
        .setDescription("Second Ascension New Transcension"),

    async execute(interaction) {
        const { channel, options } = interaction;
        await interaction.reply({ content: "Second Ascension New Transcension", ephemeral: false })
    }
}
