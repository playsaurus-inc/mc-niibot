
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("transcendencepower")
        .setDescription("info on transcendence power"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "TP or Transcendence Power is a function in the game that provides more HS from primal bosses. The TP cap is 25%, increasing to this point through AS and therefore transcendence. Your main goal is the efficiently earn your TP and transcend optimally from it." })
    }
}
