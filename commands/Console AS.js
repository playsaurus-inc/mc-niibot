
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("consoleas")
        .setDescription("Console AS google sheet"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "**For console use only**\n<https://docs.google.com/spreadsheets/d/1m09HoNiLW-7t96gzguG9tU_HHaRrDrtMpAoAuukLB4w/edit#gid=0>"})
        }
    }
        