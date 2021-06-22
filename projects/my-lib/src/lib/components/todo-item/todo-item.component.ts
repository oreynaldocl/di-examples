import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TodoItem } from '../../models';

import { I18nFacadeService } from '../../services/i18n-facade.service';

@Component({
  selector: 'lib-todo-item',
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibTodoItemComponent implements OnInit {
  @Output() changeDone = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();
  @Output() enableEdit = new EventEmitter<void>();

  @Input() item: TodoItem;
  @Input() disabled: boolean;

  constructor(
    public i18n: I18nFacadeService,
  ) { }

  ngOnInit(): void {
  }
}
