
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("getarole")
        .setDescription("how to get a role"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;
            await interaction.reply({content: "<#954519741018554478>, DM the bot as described in the linked channel. It isn't usually instant. \nThe current processes for obtaining a role are relatively straightforward for a human and should weed out bots and non-active and non-compliant persons: 1) inquiry with chat or searching history or commands; 2) reading and comprehending rules, instructions, and applicable advise; and 3) practical application of the instructions received. Completion of these processes should be simple enough for those able, eager, and ready to earn a role in this server.", ephemeral: false })
        }
    }
        