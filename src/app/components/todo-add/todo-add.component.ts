import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
})
export class TodoAddComponent implements OnInit {
  @Output() addItem = new EventEmitter<string>();

  @Input() disabled: boolean;

  todoText = '';

  get todoTextTrimmed(): string {
    return this.todoText.trim();
  }

  constructor() { }

  ngOnInit(): void {
  }

  callAdd(): void {
    if (this.todoTextTrimmed.length > 0) {
      this.addItem.emit(this.todoText);
      this.todoText = '';
    }
  }
}
