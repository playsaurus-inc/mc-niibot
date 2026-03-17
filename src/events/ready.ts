import type { Client } from 'discord.js';

export function onReady(client: Client<true>): void {
	console.log(`${client.user.username} is online!`);
}
