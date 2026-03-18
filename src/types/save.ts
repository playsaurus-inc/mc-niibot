/** A valid save submission stored for future duplicate detection. */
export interface SaveEntry {
	/** Discord user ID of the submitter. */
	userID: string;
	/** Discord username at the time of submission. Missing on legacy entries. */
	username?: string;
	/** Unique identifier from the Clicker Heroes save file. */
	gameUID: string | undefined;
	/** ISO 8601 timestamp of when the save was submitted. Missing on legacy entries. */
	createdAt?: string;
	/** Raw encoded save file contents. */
	save: string;
}

/** Reason a save was flagged and the user was banned from role assignment. */
export enum BanReason {
	/** A different Discord user already submitted a save with the same game UID. */
	DuplicateSave = 'duplicate_save',
	/** The save's ruby count exceeds the configured maximum threshold. */
	ExcessiveRubies = 'excessive_rubies',
}

/** A save submission that was flagged as illegitimate. */
export interface BannedSaveEntry {
	/** Discord user ID of the banned submitter. */
	userID: string;
	/** Discord username at the time of the ban. */
	username: string;
	/** Unique identifier from the Clicker Heroes save file. */
	gameUID: string | undefined;
	/** Ruby count found in the save at the time of the ban. */
	rubies: number;
	/** The user ID of the existing save owner that matched, when banned for duplicate save. */
	matchedUserID: string | undefined;
	/** Whether the user was banned from role assignment. */
	userBanned: boolean;
	/** ISO 8601 timestamp of when the ban occurred. */
	bannedAt: string;
	/** The reason the save was flagged. */
	reason: BanReason;
	/** Raw encoded save file contents. */
	save: string;
}

/** Persistent store for valid save submissions. */
export interface SaveStore {
	saves: SaveEntry[];
}

/** Persistent store for flagged save submissions. */
export interface BannedSaveStore {
	saves: BannedSaveEntry[];
}

/** A user permanently banned from role assignment. */
export interface BannedFromRolesEntry {
	/** Discord user ID of the banned user. */
	userID: string;
	/** Discord username at the time of the ban. */
	username: string;
	/** ISO 8601 timestamp of when the ban occurred. */
	bannedAt: string;
	/** The reason for the ban. */
	reason: BanReason;
}

/** Persistent store for users permanently banned from role assignment. */
export interface BannedFromRolesStore {
	bannedFromRoles: BannedFromRolesEntry[];
}

/** Decoded Clicker Heroes save file data. */
export interface SaveData {
	/** Collection of heroes and their levels. */
	heroCollection: {
		heroes: Record<string, { level: number }>;
	};
	/** Current ruby count. */
	rubies: number;
	/** Unique save identifier, typically a Steam ID or generated UID. */
	uniqueId: string;
}
