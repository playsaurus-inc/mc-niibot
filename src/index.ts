import 'dotenv/config';

import { execSync } from 'node:child_process';
import * as Sentry from '@sentry/node';

function getGitTag(): string | undefined {
	try {
		return execSync('git describe --tags --abbrev=0').toString().trim();
	} catch {
		return undefined;
	}
}

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		environment: process.env.APP_ENV ?? 'production',
		release: getGitTag(),
		integrations: (defaults) => [
			...defaults,
			Sentry.captureConsoleIntegration({ levels: ['error'] }),
		],
	});
	console.log('Sentry initialized');
} else {
	console.log('Sentry DSN not provided, Sentry not initialized');
}

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
	console.error(
		'Missing required environment variables: DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID',
	);
	process.exit(1);
}

process.on('unhandledRejection', (error) => {
	console.error('Unhandled rejection:', error);
	Sentry.captureException(error);
});

process.on('uncaughtException', (error) => {
	console.error('Uncaught exception:', error);
	Sentry.captureException(error);
	process.exit(1);
});

import('./bot')
	.then(({ startBot }) =>
		startBot({
			token: DISCORD_TOKEN,
			clientId: DISCORD_CLIENT_ID,
			guildId: DISCORD_GUILD_ID,
		}),
	)
	.catch((error: unknown) => {
		console.error('Failed to start bot:', error);
		Sentry.captureException(error);
		process.exit(1);
	});
