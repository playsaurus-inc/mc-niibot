
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("desc")
        .setDescription("Read the channel description!"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            await interaction.reply({content: "Read the channel description!", ephemeral: false })
        }
    }
        