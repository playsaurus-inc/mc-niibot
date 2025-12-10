const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("autoclicker")
        .setDescription("Info on ACs"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Auto Clickers (ACs) are a mechanic you buy in the ruby shop that cost 1000 + 500n rubies each where n is the number of ACs you currently have.\nAutoclickers can be placed on the monster, hero levelup button, \"buy all upgrades\", and skills. Usually it's recommended to place one AC on your main, gilded hero, and all others on the monster.\nEach AC deals 10 clicks per second, until 5 ACs are placed on the monster, then cps grows according to the formula 10×1.5^(n-1) where n is the number of active ACs on the monsters.\nThe total cost to buy autoclickers 1 to n equals 250n(n+3)." })
    }
};
