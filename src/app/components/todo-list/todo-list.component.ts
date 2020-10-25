import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { TodoItem } from 'my-lib';

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
import { CustomDatepickerI18n, DateUtils } from 'src/app/core/services';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  providers: [
    {
      provide: NgbDatepickerI18n,
      useClass: CustomDatepickerI18n,
    },
  ],
})
export class TodoListComponent implements OnInit, OnDestroy {
  $todoItems: Observable<TodoItem[]>;
  updateAfter: number;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store<StoreState>,
    private dateUtils: DateUtils,
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
    console.log('Using date utils', updatedAfter, this.dateUtils.parseToDateStruct(new Date(updatedAfter)));
    this.store.dispatch(cancelAllEdits());
    this.$todoItems = this.store.select(getTodoItemsFiltered, { updatedAfter });
  }
}
