import type { Client, Message } from 'discord.js';
import type { SaveService } from './saves.ts';

/** Maps hero slot index (1-based, as string) to Discord role ID */
export const HERO_ROLES: Record<string, string> = {
	'1': '954478762609770558', // Cid
	'2': '954478916037390377', // Treebeast
	'3': '954479042189488148', // Ivan
	'4': '954479205205291018', // Brittany
	'5': '954503656806416384', // Fisherman
	'6': '954479315481931817', // Betty
	'7': '954479514824622200', // Samurai
	'8': '954479682991050773', // Leon
	'9': '954479826306215946', // Forest Seer
	'10': '954479940525514782', // Alexa
	'11': '954480031508340756', // Natalia
	'12': '954480252904685598', // Mercedes
	'13': '954480412846092298', // Bobby
	'14': '954480498518929529', // Broyle
	'15': '954480578315563008', // Sir George II
	'16': '954480673027158016', // King Midas
	'17': '954480842124701747', // Referi Jerator
	'18': '954480982713585704', // Abaddon
	'19': '954481096903516200', // Ma Zhu
	'20': '954481186615459840', // Amenhotep
	'21': '954481276860104804', // Beastlord
	'22': '954481370112081931', // Athena
	'23': '954481448226803724', // Aphrodite
	'24': '954481585774821418', // Shinatobe
	'25': '954481700220600320', // Grant
	'26': '954481771087527966', // Frostleaf
	'27': '954481841111445535', // Dread Knight
	'28': '954481917686866061', // Atlas
	'29': '954481993528258600', // Terra
	'30': '954482077535985734', // Phthalo
	'31': '954482150009372802', // Orntchya
	'32': '954482335867363439', // Lilin
	'33': '954482437990281227', // Cadmia
	'34': '954482614629175346', // Alabaster
	'35': '954482788608901181', // Astraea
	'36': '954482883492454400', // Chiron
	'37': '954504616538697769', // Moloch
	'38': '954482966480969808', // Bomber Max
	'39': '954483061205123172', // Gog
	'40': '954483163105734747', // Wepwawet
	'41': '954483239597260971', // Tsuchi
	'42': '954483392597073980', // Skogur
	'43': '954483519269249084', // Moeru
	'44': '954483641180889098', // Zilar
	'45': '954483717169086524', // Madzi
	'46': '954483982609842186', // Xavira
	'47': '954484076750991431', // Cadu
	'48': '954484161912119316', // Ceus
	'49': '954484216203182240', // The Maw
	'50': '954484291172175953', // Yachiyl
	'51': '954484414140780604', // Rose
	'52': '954484508579733514', // Sophia
	'53': '954484562874990614', // Blanche
	'54': '954484630868881421', // Dorothy
};

/**
 * Handles hero role assignment based on the player's highest unlocked hero.
 */
export class RoleService {
	constructor(
		private _client: Client,
		private _guildId: string,
		private _saveService: SaveService,
	) {}

	/**
	 * Assigns the appropriate hero role based on the player's highest unlocked hero.
	 * No-ops if the user is banned from roles or the hero index is out of range.
	 *
	 * @param highestHeroUnlocked - The 1-based hero slot index of the highest unlocked hero.
	 * @param message - The Discord message that triggered the role assignment.
	 */
	async setRole(highestHeroUnlocked: number, message: Message): Promise<void> {
		const userId = message.author.id;

		if (this._saveService.isBannedFromRole(userId)) return;
		if (highestHeroUnlocked <= 0) return;

		const guild = this._client.guilds.cache.get(this._guildId);
		if (!guild) {
			console.error(`Guild ${this._guildId} not found in cache`);
			return;
		}

		try {
			const guildMember = await guild.members.fetch(userId);
			const roleId = HERO_ROLES[String(highestHeroUnlocked)];

			if (!roleId) {
				console.error(`No role mapped for hero index ${highestHeroUnlocked}`);
				return;
			}

			await guildMember.roles.add(roleId);
			console.log(`Assigned role ${roleId} to ${userId}`);
			await message.reply(
				'You have been assigned a role on the Clicker Heroes Discord. Post a message in chat to see it.',
			);
		} catch (error) {
			console.error('Failed to assign role:', error);
		}
	}
}
