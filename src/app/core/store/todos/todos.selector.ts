import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { TodoItem } from 'my-lib';

import { StoreState } from '../store.state';
import { TodosState } from './todos.reducer';

export const getTodoState = createFeatureSelector<StoreState, TodosState>('todos');

export const getTodoItems: MemoizedSelector<StoreState, TodoItem[]> = createSelector(
  getTodoState,
  (todos: TodosState) => Object.values(todos.todos),
);

export const getTodoItemsFiltered = createSelector(
  getTodoItems,
  (todos: TodoItem[], props: { updatedAfter: number }) => {
    if (props.updatedAfter > 0) {
      return todos.filter(item => item.updatedAt > props.updatedAfter);
    }
    return todos;
  },
);
