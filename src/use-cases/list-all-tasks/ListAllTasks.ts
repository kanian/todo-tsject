import { Service } from '@kanian77/tject';
import { IToDoService } from '../../core/todo/IToDoService';
import { UseCase } from '../UseCase';

export const LIST_ALL_TASKS_TOKEN = 'ListAllTasks';
@Service({ token: LIST_ALL_TASKS_TOKEN, lifecycle: 'transient' })
export class ListAllTasks extends UseCase {
  constructor(private toDoService: IToDoService) {
    super();
  }
  execute() {
    return this.toDoService.listTasks();
  }
}
