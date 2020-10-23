import { Action, createReducer, on } from '@ngrx/store';

import { addItem, changeDone, changeEditIndex, deleteItem, editItem, loadItems, sortItems } from './todos.actions';
import { TodosState } from './todos.state';

export const initialState: TodosState = {
  todos: [],
  editedIndex: null,
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
      updatedAt: new Date().getTime(),
    };

    return {
      ...state,
      todos,
      editedIndex: null,
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

  on(changeEditIndex, (state, { index }) => ({
    ...state,
    editedIndex: index,
  })),
);

export function reducer(
  state: TodosState,
  action: Action,
): TodosState {
  return todosReducer(state, action);
}
