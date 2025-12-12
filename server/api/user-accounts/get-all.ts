import { db } from '../../database/client';
import { users } from '../../database/schema';
import { asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
     // Ensure only admins can access
     if (event.context.userLevel !== 'admin') {
          throw createError({
               statusCode: 403,
               statusMessage: 'Forbidden: admin access required.',
          });
     }

     const Users = await db.select().from(users).orderBy(asc(users.id));

     return Users;
});
