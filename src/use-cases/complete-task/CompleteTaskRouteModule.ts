import { Module } from '@kanian77/tject';
import {
  COMPLETE_TASK_ROUTE_TOKEN,
  CompleteTaskRoute,
} from './CompleteTaskRoute';

export const CompleteTaskRouteModule = new Module({
  providers: [
    {
      provide: COMPLETE_TASK_ROUTE_TOKEN,
      useClass: CompleteTaskRoute,
    },
  ],
});
