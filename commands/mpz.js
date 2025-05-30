
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mpz")
        .setDescription("Monsters per zone. The fewer, the faster. We want faster."),

    async execute(interaction) {
        const { channel, options } = interaction;
        await interaction.reply({ content: "Monsters per zone. The fewer, the faster. We want faster.", ephemeral: false })
    }
}
