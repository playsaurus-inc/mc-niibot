
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("consolehybrid")
        .setDescription("info on console hybrid play"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Console is a fun alternative to the current version of the game. Just note that because it's behind a few versions, it's slower to progress.\nActive is still better, but because you may want to rely on offline progress, Hybrid is better. You'll also want to level Xyl with reasonable balance each Transcension, so Siyalatas can be a more comparable alternative to Juggernaut." })
    }
}
