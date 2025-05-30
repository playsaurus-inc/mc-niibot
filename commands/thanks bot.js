
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("thanksbot")
        .setDescription("you're welcome video"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "https://www.youtube.com/watch?v=79DijItQXMM", ephemeral: false })
    }
}
