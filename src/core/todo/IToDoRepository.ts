import { ToDo } from './ToDo';

export interface IToDoRepository {
  create(toDo: ToDo): ToDo;
  update(update: Partial<ToDo>): ToDo;
  findOne(id: number): ToDo;
  findAll(): ToDo[];
  delete(id: number): void;
}
