
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("theseancients")
        .setDescription("which ancients to get"),

    async execute(interaction) {
        const { channel, options } = interaction;


        await interaction.reply({ content: "Git first if idle: Siyalatas > Kumawakamaru > Libertas > Nogardnit (only if you have at least one ingame Auto Clicker)\nGet first if active/hybrid: Juggernaut > Kumawakamaru > Fragsworth > Bhaal\nThen, for either style: Atman > Argaiv > Mammon > Dora > Mimzee > Pluto (only if active/hybrid)\nWhen you have enough HS to summon all ancients, a button appears to do so. It is recommended to use this.\nUse an ancient calculator, like <https://graceoflives.github.io/fluffy-garbanzo/>" })
    }
}
