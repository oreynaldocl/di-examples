import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { TodoItem } from 'src/app/core/models';
import { StoreState } from 'src/app/core/store/store.state';
import {
  getTodoItems,
  changeDone as changeDoneAction,
  addItem,
  editItem,
  deleteItem,
  enableEditItem,
} from 'src/app/core/store/todos';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: [
  ]
})
export class TodoListComponent implements OnInit, OnDestroy {
  $todoItems: Observable<TodoItem[]>;
  editedIndex: number;
  isEditing: boolean;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store<StoreState>,
  ) { }

  ngOnInit(): void {
    this.$todoItems = this.store.select(getTodoItems);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeDone(item: TodoItem, index: number): void {
    this.store.dispatch(changeDoneAction({
      index,
      done: !item.done,
    }));
  }

  callAddItem(text: string): void {
    const item: TodoItem = { text };
    this.store.dispatch(addItem({ item }));
  }

  enableEdit(index: number): void {
    this.store.dispatch(enableEditItem({ index }));
  }

  callEditItem(item: TodoItem, index: number): void {
    this.store.dispatch(editItem({ item, index }));
  }

  callDeleteItem(index: number): void {
    this.store.dispatch(deleteItem({ index }));
  }
}
