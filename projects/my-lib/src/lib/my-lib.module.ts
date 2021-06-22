import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { LibTodoAddComponent } from './components/todo-add/todo-add.component';
import { LibTodoEditComponent } from './components/todo-edit/todo-edit.component';
import { LibTodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { LibTodoItemComponent } from './components/todo-item/todo-item.component';

@NgModule({
  declarations: [
    LibTodoAddComponent,
    LibTodoEditComponent,
    LibTodoFilterComponent,
    LibTodoItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    NgbDatepickerModule,
    NgbPopoverModule,
  ],
  exports: [
    LibTodoAddComponent,
    LibTodoEditComponent,
    LibTodoFilterComponent,
    LibTodoItemComponent,
  ],
  providers: [],
})
export class MyLibModule { }
