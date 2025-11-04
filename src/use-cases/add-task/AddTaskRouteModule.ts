import { Module } from '@kanian77/tject';
import { ADD_TASK_ROUTE_TOKEN, AddTaskRoute } from './AddTaskRoute';

export const AddTaskRouteModule = new Module({
  providers: [
    {
      provide: ADD_TASK_ROUTE_TOKEN,
      useClass: AddTaskRoute,
    },
  ],
});
