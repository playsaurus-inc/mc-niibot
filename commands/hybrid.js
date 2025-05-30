
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hybrid")
        .setDescription("how to play hybrid"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Hybrid is a build that uses elements of Active and Idle. Suggested when you have at least 1 Autoclicker. \n1.) Select Hybrid in your ancient calculator and level ancients accordingly. \n2.) Use idle until it fails to beat bosses, or if you are higher than zone 50K, until timelapses are done.\n3.) Switch to active using your autoclicker(s) until you fail a boss again after having used skills/gilded the right hero etc. \nnote: as long as the game is open there is no reason to stay idle. Active is always stronger, and is usually better for gold with Golden Clicks active." })
    }
}
