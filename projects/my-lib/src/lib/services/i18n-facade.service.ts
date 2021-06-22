import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: I18nFacadeServiceFactory,
})
export abstract class I18nFacadeService {
  abstract stream(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
  abstract get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
}

@Injectable()
export class I18nFacadeServiceDefault extends I18nFacadeService {
  constructor() {
    super();
    console.log('LibI18nServiceDefault');
  }

  stream(key: string | Array<string>, _interpolateParams?: Object): Observable<string | any> {
    return of(`*${key}`);
  }

  get(key: string | Array<string>, _interpolateParams?: Object): Observable<string | any> {
    return of(`*${key}`);
  }
}

export function I18nFacadeServiceFactory(): I18nFacadeService {
  return new I18nFacadeServiceDefault();
}
