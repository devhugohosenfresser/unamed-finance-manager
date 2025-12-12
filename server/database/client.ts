import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const queryClient = postgres(process.env.DATABASE_URL!, {
     max: 1, // Important for serverless / Nitro
     idle_timeout: 5,
     connect_timeout: 5,
});

export const db = drizzle(queryClient, { schema });

export default db;
