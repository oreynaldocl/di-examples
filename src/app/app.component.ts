import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import TodoItems from '../assets/todo-items.json';
import { TodoItem } from './core/models';
import { StoreState } from './core/store/store.state';
import { loadItems } from './core/store/todos';

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
    const items: TodoItem[] = TodoItems;
    for (let i = 0; i < limit; i++) {
      const createdAt = (new Date()).getTime() - (dayTimestamp * (limit - i));
      items.push({
        done: false,
        text: `Task ${items.length + 1}`,
        createdAt,
        updatedAt: createdAt,
      });
    }
    this.store.dispatch(loadItems({ items }));
  }
}
