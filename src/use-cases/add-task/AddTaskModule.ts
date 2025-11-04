import { Module } from '@kanian77/tject';
import { ADD_TASK_TOKEN, AddTask } from './AddTask';
import { ToDoServiceModule } from '../../core/todo/ToDoServiceModule';
import { TO_DO_SERVICE_TOKEN } from '../../core/todo/ToDoService';

export const AddTaskModule: Module = new Module({
  providers: [
    {
      provide: ADD_TASK_TOKEN,
      useClass: AddTask,
    },
  ],
  imports: [
    {
      module: ToDoServiceModule,
      binds: [{ to: ADD_TASK_TOKEN, from: TO_DO_SERVICE_TOKEN }],
    },
  ],
});
