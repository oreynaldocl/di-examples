import { Action, createReducer, on } from '@ngrx/store';

import { addItem, deleteItem, editItem, loadItems, sortItems } from './todos.actions';
import { TodosState } from './todos.state';

export const initialState: TodosState = {
  todos: [],
};


const todosReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    todos: action.items,
  })),

  on(addItem, (state, action) => ({
    ...state,
    todos: [
      ...state.todos,
      action.item,
    ],
  })),

  on(editItem, (state, action) => {
    const todos = [...state.todos];
    todos[action.index] = action.item;

    return {
      ...state,
      todos,
    };
  }),

  on(deleteItem, (state, action) => {
    const todos = [...state.todos];
    todos.splice(action.index);

    return {
      ...state,
      todos,
    };
  }),

  on(sortItems, (state) => ({
    ...state,
  })),
);

export function reducer(
  state: TodosState,
  action: Action,
): TodosState {
  return todosReducer(state, action);
}
