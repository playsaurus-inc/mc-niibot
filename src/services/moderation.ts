/** Tracks recent message timestamps per user for rapid-message spam detection */
export const userMessageHistory: Record<string, number[]> = {};

/** Tracks the last post time per channel per user for cross-channel spam detection */
export const channelsPostedIn: Record<string, Record<string, number>> = {};
