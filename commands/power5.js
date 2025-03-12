
    const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("power5")
        .setDescription("what the power 5 is and how to utilize them"),
    
        async execute(interaction)
        {
            const {channel, options} = interaction;

            
            await interaction.reply({content: "Before being able to afford regilding and after getting Frostleaf's final upgrade, you should level Treebeast, Ivan, Brittany, Samurai, or Seer. Prioritize the one with the most gilds, and in the case of a tie, pick any. The power 5 are more efficient than other heroes because they receive 4x damage multipliers every 25 hero levels after level 200. If you can afford regilding but haven't reached Atlas's gild point you should regild to Samurai."})
        }
    }
        