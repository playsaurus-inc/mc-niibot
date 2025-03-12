
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("kibble")
        .setDescription("kibble guide"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            await interaction.reply({content: "<https://steamcommunity.com/sharedfiles/filedetails/?id=2011778243>", ephemeral: false })
        }
    }
        