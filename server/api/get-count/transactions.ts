import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { transactions } from '../../database/schema';

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema: { transactions } });

export default defineEventHandler(async () => {
     const TransactionsCount = await db.$count(transactions);
     return TransactionsCount;
});
