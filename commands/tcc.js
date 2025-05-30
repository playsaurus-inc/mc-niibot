
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tcc")
        .setDescription("info on treasure chest chance"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Treasure Chest Chance. It's usually 1% anyway. No big deal." })
    }
}
