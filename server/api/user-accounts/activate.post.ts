import { db } from '../../database/client';
import { users } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     // Ensure only admins can access
     if (event.context.userLevel !== 'admin') {
          throw createError({
               statusCode: 403,
               statusMessage: 'Forbidden: admin access required.',
          });
     }

     const body = await readBody(event);
     const { UserId } = body;

     if (!UserId) {
          throw createError({
               statusCode: 400,
               statusMessage: 'UserId is required.',
          });
     }

     // Check if user exists
     const user = await db.select().from(users).where(eq(users.id, UserId));

     if (user.length === 0) {
          throw createError({
               statusCode: 404,
               statusMessage: 'User not found.',
          });
     }

     if (user[0].status === 'active') {
          throw createError({
               statusCode: 400,
               statusMessage: 'Account is already active.',
          });
     }

     // Activate user
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
