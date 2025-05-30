
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whatareclans")
        .setDescription("info on clans"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Clans are a mechanic that unlocks after beating zone 50. Clans allow members to run daily attacks by attacking an “immortal” boss. You earn Hero Souls and Rubies as rewards when they are defeated and level up your chosen class to deal more damage to them. Classes are each the same and only provide damage bonus of 1.25x on days the immortal would be weak to that class." })
    }
}
