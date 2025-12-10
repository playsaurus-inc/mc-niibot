const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("saveconvert")
        .setDescription("How to convert between mobile and PC"),

    async execute(interaction) {
        const { channel, options } = interaction;

        await interaction.reply({ content: "Mobile to PC. PC to mobile is same process with swapped devices. **iOS cannot be imported into, see /ios for details**\nSettings --> export --> copy save, open save converter in <#207675653091229697> --> insert save --> get PC save as a result --> take PC save and put it somewhere accessible on the new PC --> take save and import into PC" })
    }
};
