module.exports = {
	apps: [
		{
			name: 'mc-niibot',
			script: 'node_modules/.bin/tsx',
			args: 'src/index.ts',
			autorestart: true,
			watch: false,
			max_memory_restart: '500M',
			restart_delay: 5000,
			max_restarts: 10,
			min_uptime: '10s',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
			error_file: 'logs/error.log',
			out_file: 'logs/out.log',
			log_file: 'logs/combined.log',
			time: true,
			merge_logs: true,
			log_date_format: 'YYYY-MM-DD HH:mm:ss',
		},
	],
};
