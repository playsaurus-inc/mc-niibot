
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("merc")
        .setDescription("info on mercs"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Mercenaries are a source of resources including: Hero Souls, Rubies, More Mercs, Skills, and Relics (Presents, but only during Christmas event.) They level up once per 24 hours of quests, and has a 20% chance to die per 24 hours of quests, they are able to be revived with rubies/extra lives.\nIn general, the best quest is almost always rubies, excluding recruit and present quests.\nMore info, including math on what quests are best and when to revive mercs: <https://www.reddit.com/r/ClickerHeroes/comments/ahupf4/ch1_single_mercenary_strategies_for_quests_revive/>" })
    }
}
