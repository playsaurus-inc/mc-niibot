
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bp")
        .setDescription("BP info"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "```AS Needed | TP   | HP scale | HP Scale Starts At \n0 | 2%   | 1.145    | 0\n70| 3%   | 1.16     | 5000\n300       | 4%   | 1.175    | 20000\n1250      | 6%   | 1.3      | 65000\n2550      | 7%   | n/a      | n/a\n4000      | 8%   | n/a      | n/a\n6400      | 10%  | 1.354    | 150000\n18000     | 15%  | 1.45     | 250000\n40000     | 20%  | 1.55     | 360000\n65000     | 25%  | 1.65     | 370000\n102000    | 30%  | 1.75     | 380000\n145000    | 35%  | 1.85     | 480000\n190000    | 40%  | 1.95     | 500000\n240000    | 45%  | 2.1      | 1000000\n350000    | 50%  | 2.3      | 1200000\n485000    | 55%  | 2.45     | 1400000\n666000    | 60%  | 2.65     | 1500000\n840000    | 70%  | 3| 2000000\n1200000   | 80%  | 3.3      | 2500000\n1950000   | 90%  | 3.6      | 3000000\n2850000   | 100% | 4| 3500000 (Final BP)```" })
    }
}
