import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreState } from './core/store/store.state';
import { TodosStore } from './core/store/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<StoreState>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TodosStore.loadItems());
  }
}
