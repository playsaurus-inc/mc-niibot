
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("chratios")
        .setDescription("Ancient ratios"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "`Siya = √Morgulis, Mammon = 0.9 * Siya, Aragaiv/Fragsworth/Bhaal = Siya, Pluto/Libertas/Pluto = Mammon, Juggernaut =Siya^(0.8), Nogardnit = Juggernaut`"})
        }
    }
        