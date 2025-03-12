
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("pretrans")
        .setDescription("info on pre trans"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "Get Siyalatas, Libertas, Mammon, and Mimzee. Level them all the same. Unspent HS equals (Siyalatas level+1)^2. \nAlternatively, clicking consistently using Juggernaut is optimal but can be tedious and committal. Unspent HS equals (Juggernaut level+1)^(5/2)\nDon't worry about any other ancients until you reach 300 and transcend."})
        }
    }
        