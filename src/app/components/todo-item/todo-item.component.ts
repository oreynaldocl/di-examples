import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TodoItem } from 'src/app/core/models';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {
  @Output() changeDone = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();
  @Output() enableEdit = new EventEmitter<void>();

  @Input() item: TodoItem;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
