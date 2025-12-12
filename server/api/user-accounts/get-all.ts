import { db } from '../../database/client';
import { users } from '../../database/schema';
import { asc } from 'drizzle-orm';

export default defineEventHandler(async () => {
     const Users = await db.select().from(users).orderBy(asc(users.id));
     return Users;
});
