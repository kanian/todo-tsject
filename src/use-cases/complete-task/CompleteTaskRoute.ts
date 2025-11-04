import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { BlankEnv, BlankSchema } from 'hono/types';
import { COMPLETE_TASK_TOKEN, CompleteTask } from './CompleteTask';
import { Inject, Service } from '@kanian77/tject';

export const COMPLETE_TASK_ROUTE_TOKEN = Symbol('CompleteTaskRoute');
export const COMPLETE_TASK_ROUTE_PATH = '/todo';

@Service({ token: COMPLETE_TASK_ROUTE_TOKEN })
export class CompleteTaskRoute {
  @Inject({ token: COMPLETE_TASK_TOKEN, lazy: true }) private useCase!: CompleteTask; // it's ok to inject here because we dont plan on mocking use case
  _route: Hono<BlankEnv, BlankSchema, '/'> = new Hono();
  private _routePath: string = COMPLETE_TASK_ROUTE_PATH;
  constructor() {
    this._route.patch('', async (c) => {
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
