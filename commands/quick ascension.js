
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quickascension")
        .setDescription("info on quick ascensions"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Quick Ascensions are a form of skipping normal ascension, in the sense that for 50 rubies you earn HS for that ascension and move forward from your current zone rather than climbing up there. From Zone 285K to 1M these are the most efficient, as before then you should still use only TLs and after zone 1 million they are capped and will stop at around 1e19384 HS. QA gives the average amount you should have for that ascension based on PBC." })
    }
}
