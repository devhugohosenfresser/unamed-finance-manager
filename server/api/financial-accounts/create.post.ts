import { db } from '../../database/client';
import { FinancialAccounts } from '../../database/schema';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);

     let UserId;
     let name = body.name;

     if (event.context.userLevel !== 'admin') {
          // Non-admin users must use their own ID
          UserId = event.context.userId;
     } else {
          // Admins can supply any user ID in body
          UserId = body.UserId;
     }

     // Validate input
     if (!UserId || !name?.trim()) {
          throw createError({
               statusCode: 400,
               statusMessage: 'UserId and account name are required.',
          });
     }

     // Insert account and return created row
     const [account] = await db
          .insert(FinancialAccounts)
          .values({
               userId: UserId,
               name: name.trim(),
          })
          .returning();

     if (!account) {
          throw createError({
               statusCode: 500,
               statusMessage: 'Failed to create account.',
          });
     }

     return { account };
});
