import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDateStruct, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { DateUtils } from 'src/app/core/services';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFilterComponent implements OnInit {
  @Output() changeFilterTs = new EventEmitter<number>();
  selectedDate: NgbDateStruct;
  selectedTimeTs = 0;

  get isValidTs(): boolean {
    return this.selectedTimeTs > 0;
  }

  constructor(
    private dateUtils: DateUtils,
  ) { }

  ngOnInit(): void {
    this.selectedDate = this.dateUtils.parseToDateStruct(new Date());
  }

  selectDate(selected: NgbDateStruct, dateSelector: NgbPopover): void {
    dateSelector.close();
    this.selectedDate = selected;
    this.selectedTimeTs = this.dateUtils.parseToDate(this.selectedDate).getTime();
    this.changeFilterTs.emit(this.selectedTimeTs);
  }

  removeFilter(): void {
    this.selectedTimeTs = 0;
    this.changeFilterTs.emit(this.selectedTimeTs);
  }
}
