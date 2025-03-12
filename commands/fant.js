
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("fant")
        .setDescription("First Ascension New Transcension"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            await interaction.reply({content: "First Ascension New Transcension", ephemeral: false })
        }
    }
        