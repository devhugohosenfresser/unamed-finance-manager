import { getCookie } from 'h3';
import { sign } from '../utils/sign';

export default defineEventHandler((event) => {
     const path = event.req.url || '';
     const excludedPaths = [
          '/api/auth/login',
          '/api/auth/register',
          '/auth/login',
          '/auth/register',
     ];

     // Skip all excluded Paths routes
     if (excludedPaths.includes(path)) return;

     const sessionCookie = getCookie(event, 'session');
     if (!sessionCookie) {
          if (path.startsWith('/api/')) {
               throw createError({
                    statusCode: 401,
                    statusMessage: 'Unauthorized',
               });
          }
          return sendRedirect(event, '/auth/login', 302);
     }

     try {
          const [userId, userLevel, signature] = sessionCookie.split('.');
          if (
               !userId ||
               !userLevel ||
               !signature ||
               sign(`${userId}.${userLevel}`) !== signature
          ) {
               throw new Error('Invalid session');
          }

          // Attach user info to context
          event.context.userId = Number(userId);
          event.context.userLevel = userLevel;
     } catch (error) {
          // Clear invalid session cookie
          setCookie(event, 'session', '', { maxAge: -1 });
          if (path.startsWith('/api/')) {
               throw createError({
                    statusCode: 401,
                    statusMessage: 'Invalid session',
               });
          }
          return sendRedirect(event, '/auth/login', 302);
     }
});
