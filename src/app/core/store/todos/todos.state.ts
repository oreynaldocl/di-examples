import { TodoItem } from '../../models';

export interface TodosState {
  todos: TodoItem[];
  editedIndex: number;
}
