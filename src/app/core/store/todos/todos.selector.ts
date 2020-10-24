import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { TodoItem } from '../../models';
import { StoreState } from '../store.state';
import { TodosState } from './todos.state';

export const getTodoState = createFeatureSelector<StoreState, TodosState>('todos');

export const getTodoItems: MemoizedSelector<StoreState, TodoItem[]> = createSelector(
  getTodoState,
  (todos: TodosState) => todos.todos,
);

export const getTodoItemsFiltered = createSelector(
  getTodoState,
  (todos: TodosState, props: { updatedAfter: number }) => {
    if (props.updatedAfter > 0) {
      return todos.todos.filter(item => item.updatedAt > props.updatedAfter);
    }
    return todos.todos;
  },
);
