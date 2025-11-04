import { serve } from '@hono/node-server';
import { bootstrap, inject } from '@kanian77/tject';
import { APP, AppModule } from './AppModule';
import { Hono } from 'hono';

bootstrap(AppModule);

const app = inject<Hono>(APP);
console.log('routes', app.routes);

if (process.env.ENV === 'prod') {
  Bun.serve({
    fetch: app.fetch,
    port: 3000,
  });
  console.log(`Listening on http://localhost:3000`);
} else if (process.env.ENV === 'dev') {
  serve(app, (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  });
}
