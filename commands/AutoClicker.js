
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("autoclicker")
        .setDescription("Info on Auto Clickers in Clicker Heroes 1"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Auto Clickers (ACs) are a mechanic you buy in the ruby shop that cost 100 + 50n rubies each where n is the number of ACs you currently have. (×10 if on mobile)\nThey have 10 CPS until 5 of them have been placed on monsters and can be used on heroes/monsters/buy upgrades etc. After 4 ACs, cps grows according to the formula `10×1.5^(n-1)` where n is the number of active ACs on the monsters." })
    }
}
