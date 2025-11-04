import { inject, Module } from '@kanian77/tject';
import { Hono } from 'hono';
import { AddTaskModule } from './use-cases/add-task/AddTaskModule';
import {
  ADD_TASK_ROUTE_TOKEN,
  AddTaskRoute,
} from './use-cases/add-task/AddTaskRoute';
import {
  COMPLETE_TASK_ROUTE_TOKEN,
  CompleteTaskRoute,
} from './use-cases/complete-task/CompleteTaskRoute';
import { CompleteTaskModule } from './use-cases/complete-task/CompleteTaskModule';
import { ListAllTasks } from './use-cases/list-all-tasks/ListAllTasks';
import {
  LIST_ALL_TASKS_ROUTE_TOKEN,
  ListAllTasksRoute,
} from './use-cases/list-all-tasks/ListAllTasksRoute';
import { ListAllTasksModule } from './use-cases/list-all-tasks/ListAllTasksModule';

export const APP = Symbol('HonoApp');
const hono = new Hono();
// The route to AddTask use case
const addTaskRoute = inject<AddTaskRoute>(ADD_TASK_ROUTE_TOKEN);
hono.route(addTaskRoute.routePath, addTaskRoute.route);
// The route to CompleteTask use case
const completeTaskRoute = inject<CompleteTaskRoute>(COMPLETE_TASK_ROUTE_TOKEN);
hono.route(completeTaskRoute.routePath, completeTaskRoute.route);
// The route to ListAllTasks use case
const listAllTasksRoute = inject<ListAllTasksRoute>(LIST_ALL_TASKS_ROUTE_TOKEN);
hono.route(listAllTasksRoute.routePath, listAllTasksRoute.route);
export const AppModule = new Module({
  imports: [
    { module: AddTaskModule },
    { module: CompleteTaskModule },
    { module: ListAllTasksModule },
  ],
  providers: [
    {
      provide: APP,
      useValue: hono,
    },
  ],
});
