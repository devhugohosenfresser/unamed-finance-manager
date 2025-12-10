import { defineConfig } from 'drizzle-kit';

export default defineConfig({
     out: './drizzle',
     shema: './server/database/schema.ts',
     driver: 'pg',
     dbCredentials: {
          connectionString: process.env.DATABASE_URL,
     },
});
