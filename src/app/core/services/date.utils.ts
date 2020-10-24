import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateUtils {
  constructor() { }

  parseToDateStruct(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  parseToDate(model: NgbDateStruct): Date {
    return new Date(
      model.year,
      model.month - 1,
      model.day,
    );
  }
}
