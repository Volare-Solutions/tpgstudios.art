import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/lib/server/db/schema.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL ?? ''
	},
	out: './src/lib/server/db/migrations'
} satisfies Config;
