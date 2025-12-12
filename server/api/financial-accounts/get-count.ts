import { db } from '../../database/client';
import { FinancialAccounts } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const isAdmin = event.context.userLevel === 'admin';

     const result = await db
          .select()
          .from(FinancialAccounts)
          .where(
               isAdmin
                    ? undefined
                    : eq(FinancialAccounts.userId, event.context.userId)
          );

     return result.length;
});
