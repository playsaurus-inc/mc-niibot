import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import type {
	BannedFromRolesStore,
	BannedSaveEntry,
	BannedSaveStore,
	SaveData,
	SaveEntry,
	SaveStore,
} from '../types/save.ts';

const ROOT = process.cwd();
const SAVES_FILE = path.join(ROOT, 'saves.json');
const BANNED_SAVES_FILE = path.join(ROOT, 'bannedSaves.json');
const BANNED_FROM_ROLES_FILE = path.join(ROOT, 'bannedFromRoles.json');
export const UPLOADS_DIR = path.join(ROOT, 'uploads');

let saves: SaveStore = { saves: [] };
let bannedSaves: BannedSaveStore = { saves: [] };
let bannedFromRoles: BannedFromRolesStore = { bannedFromRoles: [] };

export function loadAll(): void {
	saves = JSON.parse(readFileSync(SAVES_FILE, 'utf8')) as SaveStore;
	bannedSaves = JSON.parse(
		readFileSync(BANNED_SAVES_FILE, 'utf8'),
	) as BannedSaveStore;
	bannedFromRoles = JSON.parse(
		readFileSync(BANNED_FROM_ROLES_FILE, 'utf8'),
	) as BannedFromRolesStore;

	if (!existsSync(UPLOADS_DIR)) {
		mkdirSync(UPLOADS_DIR);
	}
}

export function syncToDisk(): void {
	writeFileSync(SAVES_FILE, JSON.stringify(saves));
	writeFileSync(BANNED_SAVES_FILE, JSON.stringify(bannedSaves));
}

export function startAutoSync(intervalMs = 300_000): void {
	setInterval(() => {
		console.log('Writing save data to disk');
		syncToDisk();
	}, intervalMs);
}

export function getSaves(): SaveStore {
	return saves;
}

export function getBannedFromRoles(): BannedFromRolesStore {
	return bannedFromRoles;
}

export function isBannedFromRole(userId: string): boolean {
	return bannedFromRoles.bannedFromRoles.includes(userId);
}

export function banFromRole(userId: string): void {
	bannedFromRoles.bannedFromRoles.push(userId);
	writeFileSync(BANNED_FROM_ROLES_FILE, JSON.stringify(bannedFromRoles));
}

export function addSave(entry: SaveEntry): void {
	saves.saves.push(entry);
}

export function addBannedSave(entry: BannedSaveEntry): void {
	bannedSaves.saves.push(entry);
}

/**
 * Decodes a raw Clicker Heroes save string.
 *
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
 * Returns the index (1-based hero slot) of the highest hero with at least one level.
 */
export function getHighestHeroUnlocked(saveData: SaveData): number {
	const heroes = saveData.heroCollection.heroes;
	let highest = 0;

	for (const [key, hero] of Object.entries(heroes)) {
		if (hero.level > 0) highest = Number(key);
	}

	return highest;
}
