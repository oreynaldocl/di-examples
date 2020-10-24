import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  CustomMissingTranslationHandler,
  WebpackTranslateLoader,
  LanguageService,
} from './services';
import { todosReducer } from './store/todos';
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
      }
    }),
  ],
  providers: [
    LanguageService,
    {
      provide: LOCALE_ID,
      deps: [LanguageService],
      useFactory: LocaleFactory,
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
