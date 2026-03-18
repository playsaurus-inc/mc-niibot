import { SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from '../types/command.ts';

export const command: BotCommand = {
	data: new SlashCommandBuilder().setName('rekt').setDescription('rekt list'),

	async execute(interaction) {
		await interaction.reply({
			content:
				"☐ Not REKT \n☑️ REKT! \n☑️ PhandoREKT \n☑️ The Great ForREKT Seer \n☑️ AmenhoREKT \n☑️ REKT Knight \n☑️ WepwaREKT \n☑️ Orntchya Gladeye, Didensy REKT \n☑️ Bobby, REKT Hunter \n☑️ Mercedes, Duchess of REKT \n☑️ The Wandering REKTman \n☑️ Cid, the REKTful Adventurer \n☑️ Argaiv, Ancient of REKTment \n☑️ REKTeri jerator, REKT wizard \n☑️ TerREKT \n☑️ REKTvolc, Ancient of Luck \n☑️ Fragsworth, Ancient of REKT \n☑️ REKT'gorloth, the REKTesis cell \n☑️ BerREKTer, Ancient of Rage \n☑️ REKTatoncheir, Ancient of Wallops \n☑️ Athena, Goddess of REKT \n☑️ REKTos, Ancient of Thieves \n☑️ The Dark REKTual \n☑️ REKTload \n☑️ Metal DetREKTor \n☑️ REKTstorm \n☑️ PowerREKT \n☑️ Super REKT \n☑️ Golden REKT \n☑️ REKT Strikes \n☑️ EnerREKT \n☑️ The REKT Samurai \n☑️ Tako REKTurns \n☑️ Woodchip, the REKTent \n☑️ Primal Oversized REKTty \n☑️ REKTy Robot \n☑️ Treasure REKT \n☑️ MushREKT Bloop \n☑️ REKT Scouts",
		});
	},
};
