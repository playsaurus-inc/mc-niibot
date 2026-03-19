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

/**
 * Loads a JSON file from disk, or returns a default value if the file doesn't exist.
 */
function loadJsonFile<T>(filePath: string, defaultValue: T): T {
	if (!existsSync(filePath)) {
		writeFileSync(filePath, JSON.stringify(defaultValue));
		return defaultValue;
	}
	return JSON.parse(readFileSync(filePath, 'utf8')) as T;
}

/**
 * Manages in-memory save data stores (valid saves, banned saves, and users banned
 * from role assignment) with periodic disk synchronization.
 */
export class SaveService {
	private _saves: SaveStore = { saves: [] };
	private _bannedSaves: BannedSaveStore = { saves: [] };
	private _bannedFromRoles: BannedFromRolesStore = { bannedFromRoles: [] };
	private _autoSyncInterval: ReturnType<typeof setInterval> | null = null;

	/**
	 * Loads all JSON data stores from disk into memory. Must be called once at startup.
	 */
	loadAll(): void {
		this._saves = loadJsonFile<SaveStore>(SAVES_FILE, { saves: [] });
		this._bannedSaves = loadJsonFile<BannedSaveStore>(BANNED_SAVES_FILE, {
			saves: [],
		});
		this._bannedFromRoles = loadJsonFile<BannedFromRolesStore>(
			BANNED_FROM_ROLES_FILE,
			{
				bannedFromRoles: [],
			},
		);

		if (!existsSync(UPLOADS_DIR)) {
			mkdirSync(UPLOADS_DIR);
		}
	}

	/**
	 * Persists all in-memory data stores to their respective JSON files on disk.
	 */
	syncToDisk(): void {
		writeFileSync(SAVES_FILE, JSON.stringify(this._saves));
		writeFileSync(BANNED_SAVES_FILE, JSON.stringify(this._bannedSaves));
		writeFileSync(
			BANNED_FROM_ROLES_FILE,
			JSON.stringify(this._bannedFromRoles),
		);
	}

	/**
	 * Starts periodic auto-sync of in-memory data to disk.
	 *
	 * @param intervalMs - Sync interval in milliseconds. Defaults to 5 minutes.
	 */
	startAutoSync(intervalMs = 300_000): void {
		this._autoSyncInterval = setInterval(() => {
			console.log('Writing save data to disk');
			this.syncToDisk();
		}, intervalMs);
	}

	/**
	 * Stops the periodic auto-sync of in-memory data to disk.
	 */
	stopAutoSync(): void {
		if (this._autoSyncInterval) {
			clearInterval(this._autoSyncInterval);
			this._autoSyncInterval = null;
		}
	}

	/**
	 * Returns the in-memory save store.
	 */
	getSaves(): SaveStore {
		return this._saves;
	}

	/**
	 * Checks whether a user is permanently banned from role assignment.
	 *
	 * @param userId - Discord user ID to check.
	 */
	isBannedFromRole(userId: string): boolean {
		return this._bannedFromRoles.bannedFromRoles.some(
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
	banFromRole(userId: string, username: string, reason: BanReason): void {
		this._bannedFromRoles.bannedFromRoles.push({
			userID: userId,
			username,
			bannedAt: new Date().toISOString(),
			reason,
		});
		writeFileSync(
			BANNED_FROM_ROLES_FILE,
			JSON.stringify(this._bannedFromRoles),
		);
	}

	/**
	 * Adds a valid save submission to the in-memory store.
	 *
	 * @param entry - The save entry to store.
	 */
	addSave(entry: SaveEntry): void {
		this._saves.saves.push(entry);
	}

	/**
	 * Adds a flagged save submission to the in-memory banned saves store.
	 *
	 * @param entry - The banned save entry to store.
	 */
	addBannedSave(entry: BannedSaveEntry): void {
		this._bannedSaves.saves.push(entry);
	}

	/**
	 * Decodes a raw Clicker Heroes save string. The save format uses a magic header
	 * (`7a990` for zlib, `7e8bb` for raw deflate) followed by base64-encoded compressed JSON.
	 *
	 * @param rawData - The raw save file contents.
	 * @returns The parsed save object, or null if the data is invalid or decoding fails.
	 */
	static decodeSave(rawData: string): SaveData | null {
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
	static getHighestHeroUnlocked(saveData: SaveData): number {
		const heroes = saveData.heroCollection.heroes;
		let highest = 0;

		for (const [key, hero] of Object.entries(heroes)) {
			if (hero.level > 0) highest = Number(key);
		}

		return highest;
	}
}
