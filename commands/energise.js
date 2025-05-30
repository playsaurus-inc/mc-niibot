
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("energise")
        .setDescription("info on how to best utilize energise"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "CS>GC>LS>PS>SC>MD>DR\nEDR (Energised Dark Ritual) yields a single use of DR for 1.1x DPS.\nEnergise Reload to Reload the previous two skills used, excluding Energise. Reload can be reloaded this way as well, but the second use invalidates cooling down the first." })
    }
}
