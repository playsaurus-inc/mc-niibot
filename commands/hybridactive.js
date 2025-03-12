
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("hybridactive")
        .setDescription("difference between idle, active, and hybrid"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "**Active** is ideal under 50k zones because you won't be using TLs. \n**Hybrid** is ideal between 50k and 250k zones because you'll be using TLs. \n**Active** is ideal between 250k and 1m zones because you won't be using TLs.  **Hybrid** is ideal after 1m because you'll be using TLs."})
        }
    }
        