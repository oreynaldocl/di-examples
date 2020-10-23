import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';

import { todosReducer } from './core/store/todos';
import { environment } from '../environments/environment';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFilterComponent,
    TodoItemComponent,
    TodoAddComponent,
    TodoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot({ todos: todosReducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
