import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { LibI18nService } from 'my-lib';

@Injectable()
export class CustomI18nService extends LibI18nService {
  constructor(
    private translate: TranslateService,
  ) {
    super();
  }

  stream(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.stream(key, interpolateParams);
  }
}
