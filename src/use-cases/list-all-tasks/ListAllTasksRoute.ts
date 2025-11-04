import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { BlankEnv, BlankSchema } from 'hono/types';
import { LIST_ALL_TASKS_TOKEN, ListAllTasks } from './ListAllTasks';
import { Inject, Service } from '@kanian77/tject';

export const LIST_ALL_TASKS_ROUTE_TOKEN = Symbol('ListAllTasksRoute');
export const LIST_ALL_TASKS_ROUTE_PATH = '/todo';

@Service({ token: LIST_ALL_TASKS_ROUTE_TOKEN })
export class ListAllTasksRoute {
  @Inject({ token: LIST_ALL_TASKS_TOKEN, lazy: true }) private useCase!: ListAllTasks; // it's ok to inject here because we dont plan on mocking use case
  _route: Hono<BlankEnv, BlankSchema, '/'> = new Hono();
  private _routePath: string = LIST_ALL_TASKS_ROUTE_PATH;
  constructor() {
    this._route.get('', async (c) => {
      try {
        c.header('Content-Type', 'application/json');
        return c.json(this.useCase.execute(), StatusCodes.OK); // execution of use case here
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
