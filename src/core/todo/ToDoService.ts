import { Service } from '@kanian77/tject';
import { IToDoService } from './IToDoService';
import { IToDoRepository } from './IToDoRepository';
import { ToDo } from './ToDo';

export const TO_DO_SERVICE_TOKEN = Symbol('ToDoService');
@Service({ token: TO_DO_SERVICE_TOKEN, lifecycle: 'singleton' })
export class ToDoService implements IToDoService {
  constructor(private toDoRepository: IToDoRepository) {}
  addTask(task: string): ToDo {
    return this.toDoRepository.create(new ToDo(task));
  }
  updateTask(id: number, update: string): ToDo {
    return this.toDoRepository.update({ id, task: update });
  }
  completeTask(id: number): void {
    const toDo = this.toDoRepository.findOne(id);
    toDo.complete();
    this.toDoRepository.update(toDo);
  }
  findTask(id: number): ToDo {
    return this.toDoRepository.findOne(id);
  }
  listTasks(): ToDo[] {
    return this.toDoRepository.findAll();
  }
  deleteTask(id: number): void {
    this.toDoRepository.delete(id);
  }
}
