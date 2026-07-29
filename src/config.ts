import 'dotenv/config';

/**
 * Reads a boolean from the environment, falling back to `defaultValue` when unset.
 *
 * @throws If the variable is set to anything other than `true` or `false`.
 */
function boolEnv(name: string, defaultValue: boolean): boolean {
	const value = process.env[name];
	if (value === undefined || value.trim() === '') return defaultValue;

	const normalized = value.trim().toLowerCase();
	if (normalized === 'true') return true;
	if (normalized === 'false') return false;

	throw new Error(
		`Environment variable ${name} must be "true" or "false", got "${value}"`,
	);
}

const features = {
	/** Deletion of recruitment channel posts missing the "Recruiting:" prefix */
	recruitmentFormat: boolEnv('RECRUITMENT_FORMAT_ENABLED', true),
	/** Ban on nitro scam messages */
	nitroScamMod: boolEnv('NITRO_SCAM_MOD_ENABLED', true),
	/** Removal of discord.gg links posted by new members */
	inviteLinkMod: boolEnv('INVITE_LINK_MOD_ENABLED', true),
	/** Removal of the Google Play spam message */
	googlePlaySpamMod: boolEnv('GOOGLE_PLAY_SPAM_MOD_ENABLED', true),
	/** Ban on new members posting slurs */
	slurBanMod: boolEnv('SLUR_BAN_MOD_ENABLED', true),
	/** Ban on new members posting messages too rapidly */
	rapidMessageSpamMod: boolEnv('RAPID_MESSAGE_SPAM_MOD_ENABLED', true),
	/** Ban on users posting across several channels at once */
	crossChannelSpamMod: boolEnv('CROSS_CHANNEL_SPAM_MOD_ENABLED', true),
} as const;

export const config = {
	guildId: process.env.DISCORD_GUILD_ID as string,

	features,

	// The spam detectors are missing here on purpose: they decide on timing
	// alone and only quote message text when writing to the audit log.
	/** Whether an enabled feature needs the Message Content privileged intent */
	requiresMessageContent:
		features.recruitmentFormat ||
		features.nitroScamMod ||
		features.inviteLinkMod ||
		features.googlePlaySpamMod ||
		features.slurBanMod,

	channels: {
		/** Clan recruitment channel - posts must start with "Recruiting:" */
		recruitment: '104740000591024128',
		/** Fallback channel for moderation DMs when user has DMs closed */
		modFallback: '260159911822884866',
	},

	moderation: {
		/** How long after joining (ms) a member is considered "new" for stricter checks */
		newMemberWindowMs: 43_200_000, // 12 hours
		/** Message count threshold for rapid-message spam ban */
		spamMessageCount: 6,
		/** Time window (ms) for rapid-message spam detection */
		spamWindowMs: 8_000,
		/** Max rubies before a save is considered cheated */
		maxRubies: 5_000_000,
	},
} as const;
