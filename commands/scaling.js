
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("scaling")
        .setDescription("info on MPZ scaling"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "MPZ: +0.1/500 zones, Boss Timer: -2/500 zones, TCC: -0.994%(multiplicative)/500 zones, Boss Health: +0.4/500 zones, PBC: +2/500 zones. " })
    }
}
