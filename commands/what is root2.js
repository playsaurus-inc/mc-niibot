
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("root2")
        .setDescription("info on the Clicker Hereos 1 mod called Roott2"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "Clicker Heroes Root 2 is a mod of CH made by Nalk and Sioist that reworks heroes, transcendence, and adds a few QOL additions. List of changes can be found at <https://www.reddit.com/r/ClickerHeroes/comments/8cgnjc/clicker_heroes_root_2_v141421/>."})
        }
    }
        