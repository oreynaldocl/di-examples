import { Injectable } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
  get languageSetting(): string {
    return this.language;
  }

  private language: string;

  private loadedData = false;
  private supported = ['en', 'es'];

  constructor(
    private translate: TranslateService,
  ) {
    this.calculateLanguage();
  }

  private calculateLanguage(): void {
    const tempLocale = localStorage.getItem('language');
    this.language = this.supported.find(item => item === tempLocale) || 'en';
    this.translate.use(this.language);

    this.loadLanguageResources();
  }

  /**
   * Loaded language resource only one time.
   * @see https://angular.io/guide/i18n#internationalization-i18n
   */
  private loadLanguageResources(): void {
    if (!this.loadedData && this.language === 'es') {
      registerLocaleData(localeEs);
    }
    this.loadedData = true;
  }
}
