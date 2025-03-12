
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("666")
        .setDescription("For the glory of satan of course!"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            await interaction.reply({content: "For the glory of satan of course!", ephemeral: false })
        }
    }
        