
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("raiddamage")
        .setDescription("info on raid damage"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "Legacy raid damage equals the highest amount of HS from primals you earned during a single trans.\nNew raid damage mostly depends on your class level: dmg = 10 * 3^(lvl - 1). There's a 25% bonus if the immortal is weak to your selected class, but this bonus shouldn't matter for long term clans."})
        }
    }
        