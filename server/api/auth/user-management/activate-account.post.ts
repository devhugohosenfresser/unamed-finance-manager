import { db } from '../../../database/client';
import { users } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);
     const { UserId } = body;

     if (!UserId) {
          throw createError({
               statusCode: 400,
               statusMessage: 'UserId is required.',
          });
     }

     const user = await db.select().from(users).where(eq(users.id, UserId));

     if (user.length === 0) {
          throw createError({
               statusCode: 404,
               statusMessage: 'User not found.',
          });
     }

     if (user[0].status === 'active') {
          throw createError({
               statusCode: 404,
               statusMessage: 'Account is already active',
          });
     }

     const updatedUser = await db
          .update(users)
          .set({ status: 'active' })
          .where(eq(users.id, UserId))
          .returning();

     return {
          success: true,
          user: updatedUser[0],
     };
});
