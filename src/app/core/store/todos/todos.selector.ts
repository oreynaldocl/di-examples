import { createSelector, MemoizedSelector } from '@ngrx/store';

import { TodoItem } from '../../models';
import { StoreState } from '../store.state';
import { TodosState } from './todos.state';

export const getTodoItems: MemoizedSelector<StoreState, TodoItem[]> = createSelector(
  (store: StoreState) => store.todos,
  (todos: TodosState) => todos.todos,
);
