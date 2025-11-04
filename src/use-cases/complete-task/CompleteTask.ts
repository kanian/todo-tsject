import { Service } from '@kanian77/tject';
import { IToDoService } from '../../core/todo/IToDoService';
import { UseCase } from '../UseCase';
import { Hono } from 'hono';
import { BlankEnv, BlankSchema } from 'hono/types';

export const COMPLETE_TASK_TOKEN = 'CompleteTask';
@Service({ token: COMPLETE_TASK_TOKEN, lifecycle: 'transient' })
export class CompleteTask extends UseCase {
  constructor(private toDoService: IToDoService) {
    super();
  }
  execute({ id }: { id: number }) {
    return this.toDoService.completeTask(id);
  }
}
