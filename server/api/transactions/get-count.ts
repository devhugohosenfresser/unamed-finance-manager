import { db } from '../../database/client';
import { transactions } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const isAdmin = event.context.userLevel === 'admin';
     const userId = event.context.userId;

     const result = await db
          .select()
          .from(transactions)
          .where(isAdmin ? undefined : eq(transactions.userId, userId));

     return result.length;
});
