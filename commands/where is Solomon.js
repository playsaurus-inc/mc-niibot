
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("whereissolomon")
        .setDescription("Reveals the secrets of where Solomon went"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            
            await interaction.reply({content: "404 Ancient Not Found", ephemeral: false })
        }
    }
        