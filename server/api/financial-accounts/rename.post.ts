import { db } from '../../database/client';
import { FinancialAccounts } from '../../database/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);
     const { id, name } = body;

     if (!id || !name?.trim()) {
          throw createError({
               statusCode: 400,
               statusMessage: 'Account ID and name are required.',
          });
     }

     const isAdmin = event.context.userLevel === 'admin';
     const userId = event.context.userId;

     // Build access filter
     const accessCondition = isAdmin
          ? eq(FinancialAccounts.id, id) // admin can access any account
          : and(
                 eq(FinancialAccounts.id, id),
                 eq(FinancialAccounts.userId, userId) // user must own account
            );

     // Check if account exists & is accessible
     const account = await db
          .select()
          .from(FinancialAccounts)
          .where(accessCondition)
          .limit(1);

     if (account.length === 0) {
          throw createError({
               statusCode: 404,
               statusMessage: 'Account not found or access denied.',
          });
     }

     // Update the account name
     const updatedAccount = await db
          .update(FinancialAccounts)
          .set({ name: name.trim() })
          .where(accessCondition)
          .returning();

     return {
          success: true,
          account: updatedAccount[0],
     };
});
