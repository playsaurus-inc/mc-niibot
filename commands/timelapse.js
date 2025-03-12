
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("timelapse")
        .setDescription("info on timelapse"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "Time Lapses are a feature in the game that allows you to warp through zones by paying rubies. Their caps are: \n8 hr: 36K zones max, 10 rubies\n24 hr: 108K zones max, 20 rubies\n48hr: 216K zones max, 30 rubies\n168hr: 756K zones max, 50 rubies "})
        }
    }
        