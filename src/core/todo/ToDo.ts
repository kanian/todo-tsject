export interface ToDo {
  id?: number;
  task: string;
  done: boolean;
  createdAt: number;
  doneAt?: number;
}

export class ToDo implements ToDo {
  id?: number;
  task!: string;
  done: boolean = false;
  createdAt!: number;
  doneAt?: number;
  constructor(task: string) {
    this.task = task;
    this.createdAt = Date.now();
  }
  complete() {
    this.done = true;
    this.doneAt = Date.now();
  }
}
