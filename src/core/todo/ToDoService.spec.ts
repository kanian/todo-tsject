import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'bun:test';
import { TO_DO_SERVICE_TOKEN, ToDoService } from './ToDoService';
import { bootstrap, inject, Module } from '@kanian77/tject';
import { TO_DO_REPOSITORY_TOKEN } from './ToDoRepository';
import { MockToDoRepository } from './MockToDoRepository';
import { ToDo } from './ToDo';

/**
 * NOTE: To test in Bun or Node.js you might have to do something like:
 *   bun run build && bun test "[/full/path/to]/dist/core/todo/ToDoService.spec.js"
 *
 *   For Node.js (v20+ recommended):
 *   npm run build && node --test dist/core/todo/ToDoService.spec.js
 *   Deno users should be able to run the tests directly
 */

describe('ToDoService', () => {
  let toDoService: ToDoService;
  let mockToDoRepository: MockToDoRepository;
  beforeAll(() => {
    const ToDoRepositoryModule = new Module({
      providers: [
        {
          provide: TO_DO_REPOSITORY_TOKEN,
          useClass: MockToDoRepository,
        },
      ],
    });
    const ToDoServiceModule = new Module({
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
    bootstrap(ToDoServiceModule);
    toDoService = inject<ToDoService>(TO_DO_SERVICE_TOKEN);
    mockToDoRepository = inject<MockToDoRepository>(TO_DO_REPOSITORY_TOKEN);
  });

  beforeEach(() => {
    // Reset all mocks before each test
    mockToDoRepository.resetAllMocks();
  });

  describe('create new todo', () => {
    it('should create a new todo', async () => {
      const toDo: ToDo = new ToDo('a new todo');
      mockToDoRepository.create.mockReturnValue(toDo);
      const result = toDoService.addTask('a new todo');

      expect(mockToDoRepository.create).toHaveBeenCalledTimes(1);

      expect(result.task).toBe('a new todo');
      expect(result.done).toBe(false);
    });
  });

  describe('update todo', () => {
    it('should update an existing todo', () => {
      const toDo: ToDo = new ToDo('todo');

      mockToDoRepository.update.mockReturnValue({
        ...toDo,
        id: 1,
        task: 'updatedToDo',
      });

      const result = toDoService.updateTask(1, 'updatedToDo');

      expect(mockToDoRepository.update).toHaveBeenCalledTimes(1);
      expect(result.task).toEqual('updatedToDo');
    });

    it('should throw error when updating non-existent todo', () => {
      mockToDoRepository.update.mockImplementation(() => {
        throw new Error('ToDo with id 999 not found');
      });

      expect(() => {
        toDoService.updateTask(999, 'does not exist');
      }).toThrow('ToDo with id 999 not found');
    });
  });

  describe('find todos', () => {
    it('should find a single todo by id', () => {
      const toDo: ToDo = new ToDo('todo');
      toDo.id = 1;

      mockToDoRepository.findOne.mockReturnValue(toDo);

      const result = toDoService.findTask(1);

      expect(mockToDoRepository.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(toDo);
    });

    it('should throw error when finding non-existent todo', () => {
      mockToDoRepository.findOne.mockImplementation(() => {
        throw new Error('ToDo with id 999 not found');
      });

      expect(() => {
        toDoService.findTask(999);
      }).toThrow('ToDo with id 999 not found');
    });

    it('should list all todos', () => {
      const mockToDos: ToDo[] = [
        { ...new ToDo('todo'), id: 1 } as ToDo,
        { ...new ToDo('todo2'), id: 2 } as ToDo,
        { ...new ToDo('todo3'), id: 3 } as ToDo,
      ];

      mockToDoRepository.findAll.mockReturnValue(mockToDos);

      const result = toDoService.listTasks();

      expect(mockToDoRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockToDos);
      expect(result.length).toBe(3);
    });

    it('should return empty array when no todos exist', () => {
      mockToDoRepository.findAll.mockReturnValue([]);

      const result = toDoService.listTasks();

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('delete todo', () => {
    it('should delete a todo by id', () => {
      mockToDoRepository.delete.mockReturnValue(undefined);

      toDoService.deleteTask(1);

      expect(mockToDoRepository.delete).toHaveBeenCalledWith(1);
      expect(mockToDoRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw error when deleting non-existent todo', () => {
      mockToDoRepository.delete.mockImplementation(() => {
        throw new Error('ToDo with id 999 not found');
      });

      expect(() => {
        toDoService.deleteTask(999);
      }).toThrow('ToDo with id 999 not found');
    });
  });
});
