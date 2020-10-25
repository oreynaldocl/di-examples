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
  todos: {},
};


const todosReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    todos: action.items.reduce(
      (sub, item) => ({ ...sub, [item.index]: item }),
      {},
    ),
  })),

  on(addItem, (state, action) => {
    const indexes = Object.keys(state.todos).map(index => +index);
    const maxIndex = Math.max(...indexes);

    const todos = {
      ...state.todos,
      [maxIndex + 1]: {
        ...action.item,
        done: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        index: maxIndex,
      },
    };

    return {
      ...state,
      todos,
    };
  }),

  on(editItem, (state, { index, item }) => {
    const todos = { ...state.todos };
    todos[index] = {
      ...item,
      isEditing: false,
      updatedAt: new Date().getTime(),
    };

    return {
      ...state,
      todos,
    };
  }),

  on(enableEditItem, (state, { index }) => {
    const todos = { ...state.todos };
    todos[index] = {
      ...todos[index],
      isEditing: true,
    };

    return {
      ...state,
      todos,
    };
  }),

  on(cancelAllEdits, (state) => {
    const todos = { ...state.todos };
    Object.keys(todos).forEach(key => {
      todos[key] = { ...todos[key], isEditing: false };
    });

    return {
      ...state,
      todos,
    };
  }),

  on(deleteItem, (state, action) => {
    const todos = { ...state.todos };
    delete todos[action.index];

    return {
      ...state,
      todos,
    };
  }),

  on(changeDone, (state, { index, done }) => {
    const todos = { ...state.todos };
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
