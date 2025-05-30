
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("guido")
        .setDescription("snarky guide"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Hey you! Yes, you! Check out this outdated guide! It's super sarcastic but not as dry and dense as other guides we have to offer! Maybe the snarky nature will help you figure out how to play the game a teeny bit better. Enjoy! \n<https://www.reddit.com/r/ClickerHeroes/comments/4poez0/i_just_made_this_because_i_was_bored/>", ephemeral: false })
    }
}
