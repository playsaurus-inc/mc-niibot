
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("useless")
        .setDescription("info on forge coals"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Presents can drop forge coals and bloop coins, both of which are useless." })
    }
}
