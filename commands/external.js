const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("external")
        .setDescription("External auto clickers, macros, scripts"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Macros, scripts, or external auto clickers are considered cheating in the same sense as it is in any other game, but nothing is in place to stop it. We don't invalidate your experience for it, though, as long as you `experience` the game.\nWe frown upon editing progress. Please don't discuss any form of editing progress. Thank you." })
    }
};
