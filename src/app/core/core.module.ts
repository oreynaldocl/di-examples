import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DateFacadeUtils, I18nFacadeService } from 'my-lib';

import {
  CustomMissingTranslationHandler,
  WebpackTranslateLoader,
  LanguageService,
  CustomI18nService,
  DateUtils,
} from './services';
import { reducer as  todosReducer } from './store/todos/todos.reducer';
import { environment } from '../../environments/environment';

export function LocaleFactory(locale: LanguageService): string {
  return locale.languageSetting;
}

@NgModule({
  imports: [
    StoreModule.forRoot({ todos: todosReducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler,
      },
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader,
      },
    }),
  ],
  providers: [
    {
      provide: LanguageService,
      useClass: LanguageService,
    },
    {
      provide: LOCALE_ID,
      deps: [LanguageService],
      useFactory: LocaleFactory,
    },
    {
      provide: DateFacadeUtils,
      useValue: new DateUtils(),
    },
    CustomI18nService, // short hand for { provide: , useClass: }
    {
      provide: I18nFacadeService,
      useExisting: CustomI18nService,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
