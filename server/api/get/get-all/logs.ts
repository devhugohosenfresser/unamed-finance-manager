// TODO: Add Admin Auth to this api.
import { db } from '../../../database/client';
import { logs } from '../../../database/schema';
import { asc } from 'drizzle-orm';

export default defineEventHandler(async () => {
     const Logs = await db.select().from(logs).orderBy(asc(logs.id));
     return Logs;
});
