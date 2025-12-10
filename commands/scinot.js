const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("scinot")
        .setDescription("How to read Scientific Notation"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Switch to Scientific Notation (SciNot for short) in the game settings. An example would be the number after e in your gold.\nIn some guides SciNot is known as Log10. SciNot is eventually forced, and agreed by most to be easier to understand than Standard Notation.\nIn this game, Standard is just a hybrid of written form and SciNot. Each subsequent letter correlates to a multiple of e3. It's much simpler to read and understand the context of 1.845e24 than 1.845 septillion.\nHere's a short video on how to read and convert to and from SciNot: <https://youtu.be/bXkewQ7WEdI>" })
    }
};
