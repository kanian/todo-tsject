import { Module } from '@kanian77/tject';
import { LIST_ALL_TASKS_TOKEN, ListAllTasks } from './ListAllTasks';
import { ToDoServiceModule } from '../../core/todo/ToDoServiceModule';
import { TO_DO_SERVICE_TOKEN } from '../../core/todo/ToDoService';

export const ListAllTasksModule: Module = new Module({
  providers: [
    {
      provide: LIST_ALL_TASKS_TOKEN,
      useClass: ListAllTasks,
    },
  ],
  imports: [
    {
      module: ToDoServiceModule,
      binds: [{ to: LIST_ALL_TASKS_TOKEN, from: TO_DO_SERVICE_TOKEN }],
    },
  ],
});
