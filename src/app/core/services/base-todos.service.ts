import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoItem } from 'my-lib';

@Injectable()
export abstract class BaseTodosService {
  abstract getTodos(): Observable<TodoItem[]>;
}
