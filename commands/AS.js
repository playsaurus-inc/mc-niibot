
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("as")
        .setDescription("info on ancient souls and how to spend them"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Ancient Souls or AS should be spent according to <https://driej.github.io/Clicker-Heroes-Outsiders/>, also found in <#207675653091229697>" })
    }
}
