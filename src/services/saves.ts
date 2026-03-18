import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import type {
	BannedFromRolesStore,
	BannedSaveEntry,
	BannedSaveStore,
	BanReason,
	SaveData,
	SaveEntry,
	SaveStore,
} from '../types/save.ts';

const ROOT = process.cwd();
const SAVES_FILE = path.join(ROOT, 'saves.json');
const BANNED_SAVES_FILE = path.join(ROOT, 'bannedSaves.json');
const BANNED_FROM_ROLES_FILE = path.join(ROOT, 'bannedFromRoles.json');

/** Directory where uploaded save files are temporarily stored before processing. */
export const UPLOADS_DIR = path.join(ROOT, 'uploads');

let saves: SaveStore = { saves: [] };
let bannedSaves: BannedSaveStore = { saves: [] };
let bannedFromRoles: BannedFromRolesStore = { bannedFromRoles: [] };

/**
 * Loads all JSON data stores from disk into memory. Must be called once at startup.
 */
export function loadAll(): void {
	saves = JSON.parse(readFileSync(SAVES_FILE, 'utf8')) as SaveStore;
	bannedSaves = JSON.parse(
		readFileSync(BANNED_SAVES_FILE, 'utf8'),
	) as BannedSaveStore;

	const rawBannedFromRoles = JSON.parse(
		readFileSync(BANNED_FROM_ROLES_FILE, 'utf8'),
	);
	// TODO: Remove this migration after first deploy
	if (
		rawBannedFromRoles.bannedFromRoles.length > 0 &&
		typeof rawBannedFromRoles.bannedFromRoles[0] === 'string'
	) {
		bannedFromRoles = {
			bannedFromRoles: rawBannedFromRoles.bannedFromRoles.map(
				(userID: string) => ({
					userID,
					username: null,
					bannedAt: null,
					reason: null,
				}),
			),
		};
	} else {
		bannedFromRoles = rawBannedFromRoles as BannedFromRolesStore;
	}

	if (!existsSync(UPLOADS_DIR)) {
		mkdirSync(UPLOADS_DIR);
	}
}

/**
 * Persists all in-memory data stores to their respective JSON files on disk.
 */
export function syncToDisk(): void {
	writeFileSync(SAVES_FILE, JSON.stringify(saves));
	writeFileSync(BANNED_SAVES_FILE, JSON.stringify(bannedSaves));
	writeFileSync(BANNED_FROM_ROLES_FILE, JSON.stringify(bannedFromRoles));
}

/**
 * Starts periodic auto-sync of in-memory data to disk.
 *
 * @param intervalMs - Sync interval in milliseconds. Defaults to 5 minutes.
 */
export function startAutoSync(intervalMs = 300_000): void {
	setInterval(() => {
		console.log('Writing save data to disk');
		syncToDisk();
	}, intervalMs);
}

/**
 * Returns the in-memory save store.
 */
export function getSaves(): SaveStore {
	return saves;
}

/**
 * Returns the in-memory banned-from-roles store.
 */
export function getBannedFromRoles(): BannedFromRolesStore {
	return bannedFromRoles;
}

/**
 * Checks whether a user is permanently banned from role assignment.
 *
 * @param userId - Discord user ID to check.
 */
export function isBannedFromRole(userId: string): boolean {
	return bannedFromRoles.bannedFromRoles.some(
		(entry) => entry.userID === userId,
	);
}

/**
 * Permanently bans a user from role assignment. Writes to disk immediately.
 *
 * @param userId - Discord user ID to ban.
 * @param username - Discord username at the time of the ban.
 * @param reason - The reason for the ban.
 */
export function banFromRole(
	userId: string,
	username: string,
	reason: BanReason,
): void {
	bannedFromRoles.bannedFromRoles.push({
		userID: userId,
		username,
		bannedAt: new Date().toISOString(),
		reason,
	});
	writeFileSync(BANNED_FROM_ROLES_FILE, JSON.stringify(bannedFromRoles));
}

/**
 * Adds a valid save submission to the in-memory store.
 *
 * @param entry - The save entry to store.
 */
export function addSave(entry: SaveEntry): void {
	saves.saves.push(entry);
}

/**
 * Adds a flagged save submission to the in-memory banned saves store.
 *
 * @param entry - The banned save entry to store.
 */
export function addBannedSave(entry: BannedSaveEntry): void {
	bannedSaves.saves.push(entry);
}

/**
 * Decodes a raw Clicker Heroes save string. The save format uses a magic header
 * (`7a990` for zlib, `7e8bb` for raw deflate) followed by base64-encoded compressed JSON.
 *
 * @param rawData - The raw save file contents.
 * @returns The parsed save object, or null if the data is invalid or decoding fails.
 */
export function decodeSave(rawData: string): SaveData | null {
	if (!rawData) return null;

	const buffer = Buffer.from(rawData.slice(32), 'base64');

	try {
		let decoded: string;
		if (rawData.startsWith('7a990')) {
			decoded = zlib.inflateSync(buffer).toString();
		} else if (rawData.startsWith('7e8bb')) {
			decoded = zlib.inflateRawSync(buffer).toString();
		} else {
			return null;
		}
		return JSON.parse(decoded) as SaveData;
	} catch {
		return null;
	}
}

/**
 * Returns the 1-based hero slot index of the highest hero with at least one level.
 *
 * @param saveData - Decoded save data.
 */
export function getHighestHeroUnlocked(saveData: SaveData): number {
	const heroes = saveData.heroCollection.heroes;
	let highest = 0;

	for (const [key, hero] of Object.entries(heroes)) {
		if (hero.level > 0) highest = Number(key);
	}

	return highest;
}
