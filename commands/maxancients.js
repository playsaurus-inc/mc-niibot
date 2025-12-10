const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("maxancients")
        .setDescription("Ancients with a effect cap"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Ancients reaching their maximum effect at level:\nChronos: 1101\nVaagur: 1440\nKuma: 1498\nAtman: 2880\nDogcog & Revolc: 3743\nFortuna: 14972\nBubos & Dora: 18715" })
    }
};
