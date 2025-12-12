import { db } from '../../database/client';
import { FinancialAccounts } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);
     const { id, name } = body;

     if (!id || !name) {
          throw createError({
               statusCode: 400,
               statusMessage: 'Account ID and name are required.',
          });
     }

     // Check if account exists
     const account = await db
          .select()
          .from(FinancialAccounts)
          .where(eq(FinancialAccounts.id, id))
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
          .set({ name })
          .where(eq(FinancialAccounts.id, id))
          .returning();

     return {
          success: true,
          account: updatedAccount[0],
     };
});
