import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoItem } from 'my-lib';

import { StoreState } from './core/store/store.state';
import { loadItems } from './core/store/todos';
import TodoItems from '../assets/todo-items.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<StoreState>,
  ) {}

  ngOnInit(): void {
    const limit = 5;
    const dayTimestamp = 1000 * 60 * 60 * 24;
    let items: TodoItem[] = TodoItems;
    for (let i = 0; i < limit; i++) {
      const createdAt = (new Date()).getTime() - (dayTimestamp * (limit - i));
      items.push({
        done: false,
        text: `Task ${items.length + 1}`,
        createdAt,
        updatedAt: createdAt,
      });
    }
    items = items.map((item, index) => ({ ...item, index }));
    this.store.dispatch(loadItems({ items }));
  }
}
