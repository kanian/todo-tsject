import { ToDo } from "./ToDo";

export interface IToDoService {
  addTask(task: string): ToDo
  updateTask(id: number, update: string): ToDo
  completeTask(id: number): void;
  findTask(id: number): ToDo
  listTasks(): ToDo[]
  deleteTask(id: number): void;
}