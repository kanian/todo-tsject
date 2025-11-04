import { serve } from '@hono/node-server';
import { bootstrap, inject, Module } from '@kanian77/tject';
import { HONO_APP, HonoModule } from './HonoModule';
import { ToDoServiceModule } from './core/todo/ToDoServiceModule';
import { AddTaskModule } from './use-cases/add-task/AddTaskModule';
import { Hono } from 'hono';


bootstrap(HonoModule);

const app = inject<Hono>(HONO_APP);
console.log('routes', app.routes)
// Add this part to explicitly define the server
// Add this part to explicitly define the server
if (process.env.ENV === 'prod') {
  Bun.serve({
    fetch: app.fetch,
    port: 3000,
  });
  console.log(`Listening on http://localhost:3000`);
} else if (process.env.ENV === 'dev') {
  serve(app, (info) => {
    console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
  });
}
