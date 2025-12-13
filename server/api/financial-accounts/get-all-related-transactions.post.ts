import { db } from '../../database/client';
import { FinancialAccounts, transactions } from '../../database/schema';
import { asc, and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const isAdmin = event.context.userLevel === 'admin';
     const body = await readBody(event);

     const AccessedFinancialAccountId = body.FinancialAccountId;

     if (!isAdmin) {
          // Verify user owns financial account
          const ownership = await db
               .select({ id: FinancialAccounts.id })
               .from(FinancialAccounts)
               .where(
                    and(
                         eq(FinancialAccounts.id, AccessedFinancialAccountId),
                         eq(FinancialAccounts.userId, event.context.userId)
                    )
               )
               .limit(1);

          if (ownership.length === 0) {
               throw createError({
                    statusCode: 403,
                    statusMessage: 'User does not own this Financial Account.',
               });
          }
     }

     const AllRelatedTransactions = await db
          .select()
          .from(transactions)
          .where(
               eq(transactions.financialAccountId, AccessedFinancialAccountId)
          )
          .orderBy(asc(transactions.id));

     return AllRelatedTransactions;
});
