import { db } from '../../database/client';
import { eq, and } from 'drizzle-orm';
import { FinancialAccounts, transactions } from '../../database/schema';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);

     const {
          name,
          type,
          month,
          year,
          value,
          context,
          UserId: bodyUserId,
     } = body;

     let UserId: number;
     let FinancialAccountId: number;

     if (event.context.userLevel !== 'admin') {
          // Non-admin users must use their own ID
          UserId = event.context.userId;
          FinancialAccountId = context.FinancialAccountId;

          const ownership = await db
               .select({ id: FinancialAccounts.id })
               .from(FinancialAccounts)
               .where(
                    and(
                         eq(FinancialAccounts.id, FinancialAccountId),
                         eq(FinancialAccounts.userId, UserId)
                    )
               )
               .limit(1);

          if (ownership.length === 0) {
               throw createError({
                    statusCode: 403,
                    statusMessage: 'User does not own the Financial Account.',
               });
          }
     } else {
          // Admins can supply any user ID
          UserId = bodyUserId;
          FinancialAccountId = context.FinancialAccountId;

          const accountExists = await db
               .select({ id: FinancialAccounts.id })
               .from(FinancialAccounts)
               .where(eq(FinancialAccounts.id, FinancialAccountId))
               .limit(1);

          if (accountExists.length === 0) {
               throw createError({
                    statusCode: 404,
                    statusMessage: 'Financial Account not found.',
               });
          }
     }

     // ─────────────────────────────────────────────
     // CREATE TRANSACTION
     // ─────────────────────────────────────────────
     const [transaction] = await db
          .insert(transactions)
          .values({
               name,
               type,
               month,
               year,
               value,
               userId: UserId,
               financialAccountId: FinancialAccountId,
          })
          .returning();

     return {
          success: true,
          transaction,
     };
});
