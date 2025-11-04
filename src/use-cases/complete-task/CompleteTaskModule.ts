import { Module } from '@kanian77/tject';
import { COMPLETE_TASK_TOKEN, CompleteTask } from './CompleteTask';
import { ToDoServiceModule } from '../../core/todo/ToDoServiceModule';
import { TO_DO_SERVICE_TOKEN } from '../../core/todo/ToDoService';

export const CompleteTaskModule: Module = new Module({
  providers: [
    {
      provide: COMPLETE_TASK_TOKEN,
      useClass: CompleteTask,
    },
  ],
  imports: [
    {
      module: ToDoServiceModule,
      binds: [{ to: COMPLETE_TASK_TOKEN, from: TO_DO_SERVICE_TOKEN }],
    },
  ],
});
