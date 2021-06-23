import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { TodoItem } from 'my-lib';

import { StoreState } from 'src/app/core/store/store.state';
import { TodosStore } from 'src/app/core/store/todos';
import { CustomDatepickerI18n } from 'src/app/core/services';

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
  ) { }

  ngOnInit(): void {
    this.changeUpdatedAfter(0);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeDone(item: TodoItem, index: number): void {
    this.store.dispatch(TodosStore.changeDone({
      index,
      done: !item.done,
    }));
  }

  callAddItem(text: string): void {
    const item: TodoItem = { text };
    this.store.dispatch(TodosStore.addItem({ item }));
  }

  enableEdit(index: number): void {
    this.store.dispatch(TodosStore.enableEditItem({ index }));
  }

  callEditItem(item: TodoItem, index: number): void {
    this.store.dispatch(TodosStore.editItem({ item, index }));
  }

  callDeleteItem(index: number): void {
    this.store.dispatch(TodosStore.deleteItem({ index }));
  }

  changeUpdatedAfter(updatedAfter: number): void {
    this.store.dispatch(TodosStore.cancelAllEdits());
    this.$todoItems = this.store.select(TodosStore.getTodoItemsFiltered, { updatedAfter });
  }
}
