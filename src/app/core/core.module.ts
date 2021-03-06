import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { DateFacadeUtils, I18nFacadeService } from 'my-lib';

import {
  CustomMissingTranslationHandler,
  WebpackTranslateLoader,
  LanguageService,
  CustomI18nService,
  DateSecondUtils,
  DateUtils,
  BaseTodosService,
  TodosService,
} from './services';
import { reducer as  todosReducer } from './store/todos/todos.reducer';
import { environment } from '../../environments/environment';
import { TodosEffects } from './store/todos/todos.effects';

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
    EffectsModule.forRoot([
      TodosEffects,
    ]),
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
      // useValue: new DateUtils(),
      useValue: new DateSecondUtils(),
    },
    CustomI18nService, // short hand for { provide: , useClass: }
    {
      provide: I18nFacadeService,
      useExisting: CustomI18nService,
    },
    {
      provide: BaseTodosService,
      useClass: TodosService,
    }
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
