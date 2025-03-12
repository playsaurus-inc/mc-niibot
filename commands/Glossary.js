
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("glossary")
        .setDescription("link to wiki glossary"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            await interaction.reply({content: "<https://www.reddit.com/r/ClickerHeroes/wiki/glossary>", ephemeral: false })
        }
    }
        