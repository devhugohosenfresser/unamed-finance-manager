import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { logs } from '../../database/schema';

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema: { logs } });

export default defineEventHandler(async () => {
     const logsCount = await db.$count(logs);
     return logsCount;
});
