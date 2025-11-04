import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { BlankEnv, BlankSchema } from 'hono/types';
import { ADD_TASK_TOKEN, AddTask } from './AddTask';
import { Inject, Service } from '@kanian77/tject';

export const ADD_TASK_ROUTE_TOKEN = Symbol('AddTaskRoute');
export const ADD_TASK_ROUTE_PATH = '/todo';

@Service({ token: ADD_TASK_ROUTE_TOKEN })
export class AddTaskRoute {
  @Inject({ token: ADD_TASK_TOKEN, lazy: true }) private useCase!: AddTask; // it's ok to inject here because we dont plan on mocking use case
  _route: Hono<BlankEnv, BlankSchema, '/'> = new Hono();
  private _routePath: string = ADD_TASK_ROUTE_PATH;
  constructor() {
    this._route.post('', async (c) => {
      const body = await c.req.json();
      try {
        c.header('Content-Type', 'application/json');
        return c.json(this.useCase.execute(body), StatusCodes.OK); // execution of use case here
      } catch (e) {
        console.error(e);
        return c.json({}, StatusCodes.INTERNAL_SERVER_ERROR);
      }
    });
  }

  get route() {
    return this._route;
  }
  get routePath() {
    return this._routePath;
  }
}
