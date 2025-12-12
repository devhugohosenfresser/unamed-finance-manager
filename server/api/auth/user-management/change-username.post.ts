import { db } from '../../../database/client';
import { users } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);
     const { UserId, NewUsername } = body;

     if (!UserId || !NewUsername) {
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

     const updatedUser = await db
          .update(users)
          .set({ username: NewUsername })
          .where(eq(users.id, UserId))
          .returning();

     return {
          success: true,
          user: updatedUser[0],
     };
});
