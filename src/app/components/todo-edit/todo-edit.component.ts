import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from 'src/app/core/models';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
})
export class TodoEditComponent implements OnInit {
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

  constructor() { }

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
