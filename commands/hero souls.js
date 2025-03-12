
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("herosouls")
        .setDescription("info on hero souls"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "Hero Souls(HS) are a currency gained mainly from Primal Bosses, as well as clans and mercenary quests. Each HS provides a 10% additive dps gain, and can be used to level/purchase ancients. Ancient benefits are multiplicative with added Hero Souls dps."})
        }
    }
        