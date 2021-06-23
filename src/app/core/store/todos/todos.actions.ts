import { createAction, props } from '@ngrx/store';

import { TodoItem } from 'my-lib';

enum TodosType {
  LoadItems = '[TODOS] Load Items',
  LoadItemsSuccess = '[TODOS] Load Items Success',
  LoadItemsFailed = '[TODOS] Load Items Failed',
  AddItem = '[TODOS] Add Item',
  EditItem = '[TODOS] Edit Item',
  EnableEditItem = '[TODOS] Enable Edit Item',
  DeleteItem = '[TODOS] Delete Item',
  SortItems = '[TODOS] Sort Items',
  ChangeDone = '[TODOS] Change Done',
  CancelAllEdits = '[TODOS] Cancel All Edits',
  DisplaySuccess = '[TODOS] Display Success',
}

export const loadItems = createAction(
  TodosType.LoadItems,
);

export const loadItemsFailed = createAction(
  TodosType.LoadItemsFailed,
  props<{ error: Error }>()
);

export const loadItemsSuccess = createAction(
  TodosType.LoadItemsSuccess,
  props<{ todos: TodoItem[] }>()
);

export const addItem = createAction(
  TodosType.AddItem,
  props<{ item: TodoItem }>()
);

export const editItem = createAction(
  TodosType.EditItem,
  props<{ item: TodoItem, index: number }>()
);

export const enableEditItem = createAction(
  TodosType.EnableEditItem,
  props<{ index: number }>()
);
// EnableEditItem

export const deleteItem = createAction(
  TodosType.DeleteItem,
  props<{ index: number }>()
);

export const sortItems = createAction(
  TodosType.DeleteItem,
  props<{ attribute: string, typeField: string }>()
);

export const changeDone = createAction(
  TodosType.ChangeDone,
  props<{ done: boolean, index: number }>()
);

export const cancelAllEdits = createAction(
  TodosType.CancelAllEdits,
);

export const displaySuccess = createAction(
  TodosType.DisplaySuccess,
  props<{ message: string }>()
);
