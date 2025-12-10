const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rarekappa")
        .setDescription("Chances of the kappa boss"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "0.5% chance on boss zones ending in 0 for zones 30+. Mobile drops that chance to 0.4%. If there's a holiday event that halves the chance to 0.25% and 0.2%. Centurions up to 1000 can't be Kappa. According to u/Xeno234 on <https://www.reddit.com/r/ClickerHeroes/comments/4k0qqz/primal_kappa_percent_chance_got_one_today/>\nSo if you're clearing 8k zones per hour, you'll almost certainly get one, but you won't see it because you'll probably instakill right over it." })
    }
};
