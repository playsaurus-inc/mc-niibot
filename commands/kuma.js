
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kuma")
        .setDescription("info on kuma in Clicker Heroes 2"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "that star thing (or dark ritual) is kuma stacks.\nyou gain one every time you one-attempt a boss (25/50/75/100 only.)\nit decreases your monsters per zone by 2% per stack, above 50 stacks it decreases non-boss health.\nyou lose all stacks when you fail a boss." })
    }
}
