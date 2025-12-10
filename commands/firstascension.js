const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("firstascension")
        .setDescription("When to do your first ascension"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Your first ascension should be at zone 130 unless your progress hasn’t slowed down. Make sure you have leveled all previous heroes as high as possible, as every 2000 hero levels grants 1 Hero Soul. Following this, ascend whenever you fail bosses after zone 130, until you get to zone 300 and transcend." })
    }
};
