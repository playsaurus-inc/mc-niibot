const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lister")
        .setDescription("Clicker lister"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "<https://graceoflives.github.io/clicker-lister/>\nadd 3 backticks before and after the output e.g\n\\`\\`\\`<output>\\`\\`\\`" })
    }
};
