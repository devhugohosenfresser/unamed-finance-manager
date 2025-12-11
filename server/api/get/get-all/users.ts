import { db } from '../../../database/client';
import { users } from '../../../database/schema';

export default defineEventHandler(async () => {
     const Users = await db.select().from(users);
     return Users;
});
