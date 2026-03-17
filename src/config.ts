export const config = {
	guildId: process.env.DISCORD_GUILD_ID as string,

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
		maxRubies: 15_000,
	},
} as const;
