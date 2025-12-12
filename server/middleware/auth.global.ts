import { getCookie, setCookie, sendRedirect, createError } from 'h3';
import { sign } from '../utils/sign';

export default defineEventHandler((event) => {
     const url = new URL(event.req.url || '', 'http://localhost');
     const path = url.pathname;

     const excludedPaths = [
          '/api/auth/login',
          '/api/auth/register',
          '/auth/login',
          '/auth/register',
     ];

     const AdminPaths = [
          '/admin/dashboard',
          '/admin/panels/UsersPanel',
          '/admin/panels/FinancialAccountsPanel',
          '/admin/panels/TransactionsPanel',
     ];

     if (excludedPaths.includes(path)) return;

     const sessionCookie = getCookie(event, 'session');
     const isApi = path.startsWith('/api/');

     if (!sessionCookie) {
          if (isApi) {
               throw createError({
                    statusCode: 401,
                    statusMessage: 'Unauthorized',
               });
          }
          return sendRedirect(event, '/auth/login', 302);
     }

     try {
          const [userId, userLevel, signature] = sessionCookie.split('.');
          const validLevels = ['admin', 'user'];

          if (
               !userId ||
               !userLevel ||
               !signature ||
               !validLevels.includes(userLevel)
          ) {
               throw new Error('Invalid session format');
          }

          if (sign(`${userId}.${userLevel}`) !== signature) {
               throw new Error('Invalid signature');
          }

          // Attach user info to context
          event.context.userId = Number(userId);
          event.context.userLevel = userLevel;

          // Check admin-only paths
          if (AdminPaths.includes(path) && userLevel !== 'admin') {
               if (isApi) {
                    throw createError({
                         statusCode: 403,
                         statusMessage: 'Forbidden: admin access required',
                    });
               }
               return sendRedirect(event, '/auth/login', 302);
          }
     } catch (error) {
          setCookie(event, 'session', '', { maxAge: -1 });

          if (isApi) {
               throw createError({
                    statusCode: 401,
                    statusMessage: 'Invalid session',
               });
          }
          return sendRedirect(event, '/auth/login', 302);
     }
});
