import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TodoItem } from 'src/app/core/models';
import { StoreState } from 'src/app/core/store/store.state';
import {
  changeDone as changeDoneAction,
  addItem,
  editItem,
  deleteItem,
  enableEditItem,
  getTodoItemsFiltered,
  cancelAllEdits,
} from 'src/app/core/store/todos';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: [
  ]
})
export class TodoListComponent implements OnInit, OnDestroy {
  $todoItems: Observable<TodoItem[]>;
  updateAfter: number;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store<StoreState>,
  ) { }

  ngOnInit(): void {
    this.changeUpdatedAfter(0);
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

  /**
   * While testing I tried to make dynamic filter directly with selectors and async unsubscribe from previous Observable
   */
  changeUpdatedAfter(updatedAfter: number): void {
    this.store.dispatch(cancelAllEdits());
    this.$todoItems = this.store.select(getTodoItemsFiltered, { updatedAfter }).pipe(
      finalize(() => {
        console.log('bye bye', updatedAfter && new Date(updatedAfter));
      })
    );
  }
}
