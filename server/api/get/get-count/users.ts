// TODO: Add Admin Auth to this api.
import { db } from '../../../database/client';
import { users } from '../../../database/schema';

export default defineEventHandler(async () => {
     const UserCount = await db.$count(users);
     return UserCount;
});
