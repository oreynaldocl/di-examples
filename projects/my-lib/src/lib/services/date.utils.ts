import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export abstract class LibDateUtils {
  abstract parseToDateStruct(date: Date): NgbDateStruct;
  abstract parseToDate(model: NgbDateStruct): Date;
}
