
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("transcending")
        .setDescription("info on transcending in Clicker Heroes 1"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Transcendence is the second prestige layer in Clicker Heroes required to progress optimally. It's a step further from ascension in which you lose gilds, ancients, and hero souls, in addition to ascension losses. You gain Ancient Souls (AS), spent on /outsiders, and Transcendent Power (TP), which exponentially raises earned Primal HS. Follow the Outsider calculator in <#207675653091229697> to allocate AS effectively." })
    }
}
