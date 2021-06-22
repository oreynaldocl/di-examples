import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { I18nFacadeService } from 'my-lib';

import { LanguageService } from './language.service';

const I18N_VALUES = {
  es: {
    weekdays: [],
    months: [],
    full: [],
  },
  en: {
    weekdays: [],
    months: [],
    full: [],
  },
};

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  private language: string;

  constructor(
    private languageService: LanguageService,
    private translate: I18nFacadeService,
  ) {
    super();
    this.language = this.languageService.languageSetting;

    // @TODO: Update code that change language, when service changes language
    this.translate.get('date-picker').subscribe(
      (data) => {
        I18N_VALUES[this.language].weekdays = data.shortWeekdays;
        I18N_VALUES[this.language].months = data.shortMonths;
        I18N_VALUES[this.language].full = data.months;
      },
    );
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return I18N_VALUES[this.language].full[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return `${this.language}_${jsDate.getTime()}`;
  }
}
