import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TodoItem } from 'my-lib';

import TodoItems from 'src/assets/todo-items.json';
import { BaseTodosService } from './base-todos.service';

@Injectable()
export class TodosService extends BaseTodosService {

  getTodos(): Observable<TodoItem[]> {
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

    return of(items);
  }
}
