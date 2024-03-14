import { drizzle } from 'drizzle-orm/planetscale-serverless';
import * as schema from './schema';
import { Client } from '@planetscale/database';
import { env } from '$env/dynamic/private';

const client = new Client({
	host: env.DATABASE_HOST,
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD
});

export const db = drizzle(client, { schema });
