import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { I18nFacadeService } from '../../services/i18n-facade.service';

@Component({
  selector: 'lib-todo-add',
  templateUrl: './todo-add.component.html',
})
export class LibTodoAddComponent implements OnInit {
  @Output() addItem = new EventEmitter<string>();

  @Input() disabled: boolean;

  todoText = '';

  get todoTextTrimmed(): string {
    return this.todoText.trim();
  }

  constructor(
    public i18n: I18nFacadeService,
  ) { }

  ngOnInit(): void {
  }

  callAdd(): void {
    if (this.todoTextTrimmed.length > 0) {
      this.addItem.emit(this.todoText);
      this.todoText = '';
    }
  }
}
