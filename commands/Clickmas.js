
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clickmas")
        .setDescription("Info on clickmas"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "A CH1 seasonal event with presents and various reskins. **Presents can drop forge coals and bloop coins (both of which are useless)**, relics, spiked nogs (+1 CPS to each AC), rubies (chance for each ruby decreases after the last), label makers (to randomly rename mercs), and AC skins. Candy canes have been removed. Present quests are worse than ruby quests overall, meaning incentive to open them should come from somewhere else, if at all. \n*A note on Mobile and e9 versions of the game: The Present Panic minigame seems to have a health system that quickly eliminates the minigame enemy, yielding little to no reward. Find your presents from mercenaries instead, but you should still favor ruby quests.*" })
    }
}
