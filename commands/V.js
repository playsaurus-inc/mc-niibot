
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("v")
        .setDescription("Info on V hotkey in Clicker Heroes 1"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "***YOU CAN HOLD 'V' AND CLICK TO LEVEL UP ANCIENTS FASTER!!!***", ephemeral: false })
    }
}
