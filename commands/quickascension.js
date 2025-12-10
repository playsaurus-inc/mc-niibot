const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quickascension")
        .setDescription("Info on QAs"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Quick Ascensions (QAs) can be bought for 500 rubies in the shop. They give the expected average HS you'd gain from ascending at your current zone. This allows you to level ancients and immediately continue from your current zone. They don't give additional HS past zone 1 million, and it's recommended to start using them around zone 250k. (see /qarush)" })
    }
};
