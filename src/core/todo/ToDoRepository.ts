import { Service } from '@kanian77/tject';
import { IToDoRepository } from './IToDoRepository';
import { ToDo } from './ToDo';

export const TO_DO_REPOSITORY_TOKEN = Symbol('ToDoRepository');

@Service({ token: TO_DO_REPOSITORY_TOKEN, lifecycle: 'singleton' })
export class ToDoRepository implements IToDoRepository {
  private toDos: ToDo[] = [];

  create(toDo: ToDo): ToDo {
    const last = this.toDos[this.toDos.length - 1];
    const id = last && typeof last.id === 'number' ? last.id + 1 : 1;
    toDo.id = id;
    this.toDos.push(toDo);
    return toDo;
  }

  update(update: Partial<ToDo>): ToDo {
    if (update.id === undefined) {
      throw new Error('ID is required for update');
    }

    const index = this.toDos.findIndex((todo) => todo.id === update.id);
    if (index === -1) {
      throw new Error(`ToDo with id ${update.id} not found`);
    }

    const existing = this.toDos[index];
    const merged: ToDo = {
      ...existing,
      ...update,
      complete: update.complete ?? existing.complete,
    };

    this.toDos[index] = merged;
    return this.toDos[index];
  }

  findOne(id: number): ToDo {
    const todo = this.toDos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`ToDo with id ${id} not found`);
    }
    return todo;
  }

  findAll(): ToDo[] {
    return [...this.toDos];
  }

  delete(id: number): void {
    const index = this.toDos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error(`ToDo with id ${id} not found`);
    }
    this.toDos.splice(index, 1);
  }
}
