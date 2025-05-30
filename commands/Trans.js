
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trans")
        .setDescription("info on when to transcend"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Transcend after 3-4 ascensions **that gain new Ancient Souls**, unless at >24% Transcendence Power, then follow the outsider calculator, <https://driej.github.io/Clicker-Heroes-Outsiders/>." })
    }
}
