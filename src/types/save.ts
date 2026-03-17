export interface SaveEntry {
	userID: string;
	gameUID: string | undefined;
	save: string;
}

export interface BannedSaveEntry {
	userID: string;
	gameUID: string | undefined;
	userBanned: boolean;
	save: string;
}

export interface SaveStore {
	saves: SaveEntry[];
}

export interface BannedSaveStore {
	saves: BannedSaveEntry[];
}

export interface BannedFromRolesStore {
	bannedFromRoles: string[];
}

export interface SaveData {
	heroCollection: {
		heroes: Record<string, { level: number }>;
	};
	rubies: number;
	uniqueId: string;
}
