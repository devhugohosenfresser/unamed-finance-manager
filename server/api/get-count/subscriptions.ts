import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { subscriptions } from '../../database/schema';

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema: { subscriptions } });

export default defineEventHandler(async () => {
     const subscriptionsCount = await db.$count(subscriptions);
     return subscriptionsCount;
});
