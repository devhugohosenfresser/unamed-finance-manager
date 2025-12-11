import { setCookie } from 'h3';

export default defineEventHandler((event) => {
     setCookie(event, 'session', '', {
          httpOnly: true, // keep security
          sameSite: 'lax',
          path: '/',
          maxAge: 0, // expires immediately
     });
     // redirect to login page just to be safe
     return sendRedirect(event, '/auth/login', 302);
});
