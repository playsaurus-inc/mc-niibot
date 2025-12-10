const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getarole")
        .setDescription("How to get a role for image perms"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "This server requires people to DM <@260615392685326336> in order to get roles and image permissions to regulate spam bots.\n<#954519741018554478> explains the process. Remember that roles aren't always given out instantly by the bot." })
    }
};
