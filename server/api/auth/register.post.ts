import bycrypt from 'bcrypt';
import { db } from '../../database/client';
import { users } from '../../database/schema';

export default defineEventHandler(async (event) => {
     console.log('Register endpoint hit');
     const body = await readBody(event);

     const { username, email, password } = body;
     if (!username || !email || !password) {
          throw createError({
               statusCode: 400,
               statusMessage: 'Username, email, and password are required.',
          });
     }

     const hashedPassword = await bycrypt.hash(password, 10);

     const user = await db.insert(users).values({
          username: username,
          email: email,
          password: hashedPassword,
          role: 'user',
     });

     console.log('New user registered:', user);
});
