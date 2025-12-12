import { db } from '../../database/client';
import { users } from '../../database/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);
     const { UserId: bodyUserId } = body;

     const isAdmin = event.context.userLevel === 'admin';

     // Determine which UserId to use
     const UserId = isAdmin ? bodyUserId : event.context.userId;

     if (!UserId) {
          throw createError({
               statusCode: 400,
               statusMessage: 'UserId is required.',
          });
     }

     // Check if the user exists and is accessible
     const user = await db.select().from(users).where(eq(users.id, UserId));

     if (user.length === 0) {
          throw createError({
               statusCode: 404,
               statusMessage: 'User not found or access denied.',
          });
     }

     // Delete the user
     await db.delete(users).where(eq(users.id, UserId));

     return {
          success: true,
          message: 'User deleted successfully',
     };
});
