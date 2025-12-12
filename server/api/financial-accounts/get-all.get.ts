import { db } from '../../database/client';
import { FinancialAccounts } from '../../database/schema';
import { asc, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const isAdmin = event.context.userLevel === 'admin';

     const financialAccounts = await db
          .select()
          .from(FinancialAccounts)
          .where(
               isAdmin
                    ? undefined
                    : eq(FinancialAccounts.userId, event.context.userId)
          )
          .orderBy(asc(FinancialAccounts.id));

     return financialAccounts;
});
