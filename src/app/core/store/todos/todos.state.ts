import { TodoItem } from 'my-lib';

export interface TodosState {
  todos: { [key: string]: TodoItem };
}
