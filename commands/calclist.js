
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calclist")
        .setDescription("list of calculators"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "<https://kepow.org/clickerheroes/> (Ancients, after ascending)\n<https://driej.github.io/Clicker-Heroes-Outsiders/> (outsiders, after transcending)\n<https://driej.github.io/clickerheroes-endgame/> (progression after e100 HS)\n<https://driej.github.io/Clicker-Heroes-Timelapses/> (timelapses for beyond Z50K)\n<https://youtu.be/dQw4w9WgXcQ> (video guide for the calcs)\n<https://www.reddit.com/r/ClickerHeroes/wiki/calculators> (a bigger list of calculators)" })
    }
}
