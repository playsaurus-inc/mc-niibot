
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("universaltruth")
        .setDescription("People are idots"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            await interaction.reply({content: "People are idiots.", ephemeral: false })
        }
    }
        