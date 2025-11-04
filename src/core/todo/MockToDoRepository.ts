import { IToDoRepository } from './IToDoRepository';
import { jest } from 'bun:test';

/**
 * A mock implementation of IToDoRepository for testing purposes using Bun's
 * built-in test utilities.
 *
 * It uses `mock()` for each method, allowing you to spy on calls,
 * set return values, and provide mock implementations in your tests.
 *
 * See Bun's documentation for more details: https://bun.sh/docs/test/mocks
 *
 * Example Usage in a test (using `bun:test`):
 *
 * import { expect, test } from 'bun:test';
 *
 * const mockRepo = new MockToDoRepository();
 * const testToDo = { id: 1, text: 'Test', complete: false };
 *
 * // Set up mock return values
 * mockRepo.findOne.mockReturnValue(testToDo);
 * mockRepo.findAll.mockReturnValue([testToDo]);
 *
 * // Call the service that uses the repository
 * const result = myService.getToDo(1);
 *
 * // Assertions
 * expect(mockRepo.findOne).toHaveBeenCalledWith(1);
 * expect(result).toEqual(testToDo);
 */
export class MockToDoRepository implements IToDoRepository {
  // Create mock functions for each method of the interface
  create = jest.fn();
  update = jest.fn();
  findOne = jest.fn();
  findAll = jest.fn();
  delete = jest.fn();

  /**
   * A helper method to clear all mock function calls and instances.
   * Useful to call in a beforeEach() block in your tests.
   */
  resetAllMocks() {
    this.create.mockClear();
    this.update.mockClear();
    this.findOne.mockClear();
    this.findAll.mockClear();
    this.delete.mockClear();

    // You could also reset implementations/return values if you set defaults
    // this.create.mockReset();
    // this.update.mockReset();
    // this.findOne.mockReset();
    // this.findAll.mockReset();
    // this.delete.mockReset();
  }
}

