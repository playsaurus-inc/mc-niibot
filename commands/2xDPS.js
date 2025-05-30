
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("2xdps")
        .setDescription("double dps info"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Double Damage is a purchasable increase in dps from the shop, which, due to the values Clicker Heroes goes to, is optional at best. 2x Damage does not apply to First Ascension New Transcendence(FANT) and is rendered fairly insignificant by Phandoryss(whose primary purpose is for these FANTs) or Hero Multipliers." })
    }
}
