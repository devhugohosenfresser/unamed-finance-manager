import { db } from '../../../../database/client';
import { logs } from '../../../../database/schema';

export default defineEventHandler(async () => {
     const logsCount = await db.$count(logs);
     return logsCount;
});
