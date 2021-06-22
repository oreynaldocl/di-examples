import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export abstract class DateFacadeUtils {
  abstract parseToDateStruct(date: Date): NgbDateStruct;
  abstract parseToDate(model: NgbDateStruct): Date;
}
