import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { TodoItem } from 'src/app/core/models';
import { StoreState } from 'src/app/core/store/store.state';
import {
  getTodoItems,
  changeDone as changeDoneAction,
  addItem,
  changeEditIndex,
  getEditedIndex,
  isEditing,
  editItem,
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
    combineLatest([
      this.store.select(getEditedIndex),
      this.store.select(isEditing),
    ]).pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(0),
    ).subscribe(([index, isEditingParam]) => {
      this.editedIndex = index;
      this.isEditing = isEditingParam;
      console.log(this.editedIndex, this.isEditing);
    });
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
    this.store.dispatch(changeEditIndex({ index }));
  }

  callEditItem(item: TodoItem, index: number): void {
    this.store.dispatch(editItem({ item, index }));
  }
}
