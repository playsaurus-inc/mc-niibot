
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("maxancients")
        .setDescription("info on max levels for ancients"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Chronos:1101\nVaagur: 1440\nKuma: 1498\nAtman: 2880\nDogcog & Revolc: 3743\nFortuna: 14972\nBubos & Dora: 18715" })
    }
}
