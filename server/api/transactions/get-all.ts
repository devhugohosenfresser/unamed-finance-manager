import { db } from '../../database/client';
import { transactions } from '../../database/schema';
import { asc, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const isAdmin = event.context.userLevel === 'admin';

     const result = await db
          .select()
          .from(transactions)
          .where(
               isAdmin
                    ? undefined
                    : eq(transactions.userId, event.context.userId)
          )
          .orderBy(asc(transactions.id));

     return result;
});
