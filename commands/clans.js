
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("clans")
        .setDescription("where to find clans"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "Search posts in these places for leaders recruiting new members. For better results, answer a post instead of posting, unless you're recruiting. \n<https://www.reddit.com/r/ClickerHeroesRecruit> <#104740000591024128>"})
        }
    }
        