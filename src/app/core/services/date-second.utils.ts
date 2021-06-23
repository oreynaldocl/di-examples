import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { DateFacadeUtils } from 'my-lib';

@Injectable()
export class DateSecondUtils extends DateFacadeUtils {
  constructor() {
    super();
  }

  parseToDateStruct(date: Date): NgbDateStruct {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return NgbDate.from({ year, month, day });
  }

  parseToDate(model: NgbDateStruct): Date {
    return new Date(
      model.year,
      model.month - 1,
      model.day,
    );
  }
}
