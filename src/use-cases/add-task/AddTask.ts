import { Service } from '@kanian77/tject';
import { IToDoService } from '../../core/todo/IToDoService';
import { UseCase } from '../UseCase';

export const ADD_TASK_TOKEN = 'AddTask';
@Service({ token: ADD_TASK_TOKEN, lifecycle: 'transient' })
export class AddTask extends UseCase {
  constructor(
    private toDoService: IToDoService,
  ) {
    super();
  }
  execute({ task }: { task: string }) {
    return this.toDoService.addTask(task);
  }
}
