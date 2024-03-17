import { createPool } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

// Load the connection string from environment variables
const pool = createPool({
	connectionString: env.POSTGRES_URL
});

export const db = drizzle(pool, { schema });
