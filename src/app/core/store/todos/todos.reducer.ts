import { Action, createReducer, on } from '@ngrx/store';

import {
  addItem,
  cancelAllEdits,
  changeDone,
  deleteItem,
  editItem,
  enableEditItem,
  loadItems,
  sortItems,
} from './todos.actions';
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
      {
        ...action.item,
        done: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    ],
  })),

  on(editItem, (state, { index, item }) => {
    const todos = [...state.todos];
    todos[index] = {
      ...item,
      isEditing: false,
      updatedAt: new Date().getTime(),
    };

    return {
      ...state,
      todos,
      editedIndex: null,
    };
  }),

  on(enableEditItem, (state, { index }) => {
    const todos = [...state.todos];
    todos[index] = {
      ...todos[index],
      isEditing: true,
    };

    return {
      ...state,
      todos,
      editedIndex: null,
    };
  }),

  on(cancelAllEdits, (state) => {
    const todos = state.todos.map(item => ({ ...item, isEditing: false }));

    return {
      ...state,
      todos,
    };
  }),

  on(deleteItem, (state, action) => {
    const todos = [...state.todos];
    todos.splice(action.index, 1);

    return {
      ...state,
      todos,
    };
  }),

  on(changeDone, (state, { index, done }) => {
    const todos = [...state.todos];
    todos[index] = {
      ...todos[index],
      done,
      updatedAt: new Date().getTime(),
    };

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
