
export abstract class UseCase {
  constructor() {}
  abstract execute(...args: any[]): any;
}
