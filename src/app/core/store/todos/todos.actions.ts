import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../../models';

enum TodosType {
  LoadItems = '[TODOS] Load Items',
  AddItem = '[TODOS] Add Item',
  EditItem = '[TODOS] Edit Item',
  EnableEditItem = '[TODOS] Enable Edit Item',
  DeleteItem = '[TODOS] Delete Item',
  SortItems = '[TODOS] Sort Items',
  ChangeDone = '[TODOS] Change Done',
  CancelAllEdits = '[TODOS] Cancel All Edits',
}

export const loadItems = createAction(
  TodosType.LoadItems,
  props<{items: TodoItem[]}>()
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
