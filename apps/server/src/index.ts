import { node } from '@elysiajs/node';
import { Elysia } from 'elysia';
import { auth } from './lib/auth';
import { env } from './utils/env';

// user middleware (compute user and session and pass to routes)
const betterAuth = new Elysia({ name: 'better-auth' }).mount(auth.handler).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return status(401);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});

const app = new Elysia({ adapter: node() })
  .use(betterAuth)
  .get('/', () => 'Hello Elysia')
  .listen(env.PORT, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
  });
