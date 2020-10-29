import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../../models';

import { LibI18nService } from '../../services/i18n.service';

@Component({
  selector: 'lib-todo-edit',
  templateUrl: './todo-edit.component.html',
})
export class LibTodoEditComponent implements OnInit {
  @Output() saveEdit = new EventEmitter<TodoItem>();

  @Input()
  set item(itemParam: TodoItem) {
    this.originalItem = itemParam;
    this.localItem = { ...itemParam };
  }
  get item(): TodoItem {
    return this.localItem;
  }

  get todoTextTrimmed(): string {
    return this.item.text.trim();
  }

  private localItem: TodoItem;
  private originalItem: TodoItem;

  constructor(
    public i18n: LibI18nService,
  ) { }

  ngOnInit(): void {
  }

  updateDone(): void {
    this.item.done = !this.item.done;
  }

  callSave(): void {
    if (this.todoTextTrimmed.length > 0) {
      this.saveEdit.emit(this.item);
    }
  }

  cancelEdit(): void {
    this.saveEdit.emit(this.originalItem);
  }
}
