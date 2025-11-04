import { Module } from '@kanian77/tject';
import {
  LIST_ALL_TASKS_ROUTE_TOKEN,
  ListAllTasksRoute,
} from './ListAllTasksRoute';

export const ListAllTasksRouteModule = new Module({
  providers: [
    {
      provide: LIST_ALL_TASKS_ROUTE_TOKEN,
      useClass: ListAllTasksRoute,
    },
  ],
});
