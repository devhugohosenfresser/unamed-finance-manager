import { db } from '../../../database/client';
import { logs } from '../../../database/schema';

export default defineEventHandler(async () => {
     const Logs = await db.select().from(logs);
     return Logs;
});
