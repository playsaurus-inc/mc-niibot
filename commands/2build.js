
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("2build")
        .setDescription("CH2 guide"),

    async execute(interaction) {
        const { channel, options } = interaction;
        await interaction.reply({ content: "<https://steamcommunity.com/sharedfiles/filedetails/?id=2222847334>", ephemeral: false })
    }
}
