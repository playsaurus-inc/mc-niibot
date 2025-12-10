const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("firsttrans")
        .setDescription("Info for at first transcension"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "After having reached zone 300 for the first time, transcend, and use https://driej.github.io/Clicker-Heroes-Outsiders/ in order to allocate your gained Ancient Souls.\nAscend at zone 130 for FANT(First Ascension New Transcendence). Priority ancients are Siya/Lib/Nog if idle, Frags/Jugg/Bhaal/Pluto if active or hybrid, and Kuma/Atman regardless of build. Use one of the ancient calculators in <#207675653091229697> to level them. Ascend when you fail bosses past zone 130, and  make sure to have bought all ancients by around 1M HS. Driej's outsider calculator also provides a rough estimate to when to transcend in the yellow box, assuming an active/hybrid build. Transcend every 3-4 ascensions that **gain Ancient Souls** following this." })
    }
};
