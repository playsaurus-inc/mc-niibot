
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rules")
        .setDescription("Mods are the rules."),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Mods **are** the rules.", ephemeral: false })
    }
}
