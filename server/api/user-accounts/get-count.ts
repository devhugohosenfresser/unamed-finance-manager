import { db } from '../../database/client';
import { users } from '../../database/schema';

export default defineEventHandler(async (event) => {
     // Ensure only admins can access
     if (event.context.userLevel !== 'admin') {
          throw createError({
               statusCode: 403,
               statusMessage: 'Forbidden: admin access required.',
          });
     }

     const UserCount = await db.$count(users);
     return UserCount;
});
