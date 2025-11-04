import { Module } from '@kanian77/tject';
import { TO_DO_REPOSITORY_TOKEN } from './ToDoRepository';
import { TO_DO_SERVICE_TOKEN, ToDoService } from './ToDoService';
import { ToDoRepositoryModule } from './ToDoRepositoryModule';

export const ToDoServiceModule = new Module({
  providers: [
    {
      provide: TO_DO_SERVICE_TOKEN,
      useClass: ToDoService,
    },
  ],
  imports: [
    {
      module: ToDoRepositoryModule,
      binds: [{ to: TO_DO_SERVICE_TOKEN, from: TO_DO_REPOSITORY_TOKEN }],
    },
  ],
});
