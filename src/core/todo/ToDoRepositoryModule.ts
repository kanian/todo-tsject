import { Module } from '@kanian77/tject';
import { TO_DO_REPOSITORY_TOKEN, ToDoRepository } from './ToDoRepository';

export const ToDoRepositoryModule = new Module({
  providers: [
    {
      provide: TO_DO_REPOSITORY_TOKEN,
      useClass: ToDoRepository,
    },
  ],
});
