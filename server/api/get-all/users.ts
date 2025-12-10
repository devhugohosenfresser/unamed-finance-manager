import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from '../../database/schema';

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema: { users } });

export default defineEventHandler(async () => {
     const Users = await db.select().from(users);
     console.log(Users);
     return Users;
});
