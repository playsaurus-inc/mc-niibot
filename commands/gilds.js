
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("gilds")
        .setDescription("gilds chart link"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            await interaction.reply({content: "A direct link to the gild chart can be found here: <https://www.reddit.com/r/ClickerHeroes/comments/868uh3/10e11_hero_gilding_chart/>", ephemeral: false })
        }
    }
        