import { DATABASE_URL } from '$env/static/private';
import { createClient } from '@libsql/client/sqlite3';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({ url: DATABASE_URL });

export const db = drizzle(client);
