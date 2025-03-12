
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("diffunity")
        .setDescription("Difference between the Unity version and Flash"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            
            await interaction.reply({content: "The original CH was written in Flash to be playable on browser. When Adobe withdrew support for Flash, the game had to be removed from browser, so it could only be played in Steam. Now the devs are re-writing the code in Unity to be playable in browser again, making the game accessible to more players.", ephemeral: false })
        }
    }
        