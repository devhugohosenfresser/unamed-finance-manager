import { db } from '../../database/client';
import { users, FinancialAccounts } from '../../database/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);
     const { AccountId, UserId } = body;

     // Validate input
     if (!UserId || !AccountId) {
          throw createError({
               statusCode: 400,
               statusMessage: 'UserId and AccountId are required.',
          });
     }

     // Check account exists and belongs to user
     const financialAccount = await db
          .select()
          .from(FinancialAccounts)
          .where(
               and(
                    eq(FinancialAccounts.userId, UserId),
                    eq(FinancialAccounts.id, AccountId)
               )
          );

     if (financialAccount.length === 0) {
          throw createError({
               statusCode: 404,
               statusMessage: 'Financial Account not found.',
          });
     }

     // Delete record
     await db
          .delete(FinancialAccounts)
          .where(
               and(
                    eq(FinancialAccounts.userId, UserId),
                    eq(FinancialAccounts.id, AccountId)
               )
          );

     return {
          success: true,
          message: 'Financial Account deleted successfully',
     };
});
