import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { I18nFacadeService } from 'my-lib';

@Injectable()
export class CustomI18nService extends I18nFacadeService {
  constructor(
    private translate: TranslateService,
  ) {
    super();
  }

  stream(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.stream(key, interpolateParams);
  }

  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.get(key, interpolateParams);
  }

  instant(key: string | Array<string>, interpolateParams?: Object): string {
    return this.translate.instant(key, interpolateParams);
  }
}
