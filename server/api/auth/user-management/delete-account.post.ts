// TODO: Add Admin Auth to this API.
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

     await db.delete(users).where(eq(users.id, UserId));

     return {
          success: true,
          message: 'User deleted successfully',
     };
});
