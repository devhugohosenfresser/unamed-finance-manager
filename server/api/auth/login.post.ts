import bcrypt from 'bcrypt';
import { sign } from '../../utils/sign';
import { eq } from 'drizzle-orm';
import { db } from '../../database/client';
import { users } from '../../database/schema';

export default defineEventHandler(async (event) => {
     const body = await readBody(event);
     const { email, password } = body;

     if (!email || !password) {
          throw createError({
               statusCode: 400,
               statusMessage: 'Email and password are required.',
          });
     }

     // Fetch user from DB
     async function getUserByEmail(email: string) {
          try {
               const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email));
               return user;
          } catch (error) {
               throw createError({
                    statusCode: 501,
                    statusMessage:
                         'Login query broke, please try again later. Thank you for your understanding.',
               });
          }
     }

     const user = await getUserByEmail(email);

     if (!user || user.length === 0) {
          throw createError({
               statusCode: 401,
               statusMessage: 'No account with that email is registered.',
          });
     }

     const isPasswordValid = await bcrypt.compare(password, user[0].password);

     if (!isPasswordValid) {
          throw createError({
               statusCode: 401,
               statusMessage: 'The entered password is incorrect.',
          });
     }

     const isAccountActive = user[0].status === 'active';

     if (!isAccountActive) {
          throw createError({
               statusCode: 403,
               statusMessage:
                    'Account is not active. Please wait until your account has been verified.',
          });
     }

     const UserId = user[0].id;
     const UserLevel = user[0].role;
     const signature = sign(`${UserId}.${UserLevel}`);
     const EncryptedCookie = `${UserId}.${UserLevel}.${signature}`;

     setCookie(event, 'session', EncryptedCookie, {
          httpOnly: true,
          maxAge:
               parseInt(process.env.SESSION_COOKIE_MAX_AGE || '') ||
               60 * 60 * 24 * 7, // 7 days
     });

     return { message: 'Login successful' };
});
