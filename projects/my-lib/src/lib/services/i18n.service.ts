import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: LibI18nServiceFactory,
  // deps: [],
})
export abstract class LibI18nService {
  abstract stream(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
}

@Injectable()
export class LibI18nServiceDefault extends LibI18nService {
  constructor() {
    super();
    console.log('LibI18nServiceDefault');
  }

  stream(key: string | Array<string>, _interpolateParams?: Object): Observable<string | any> {
    return of(`*${key}`);
  }
}

export function LibI18nServiceFactory(): LibI18nService {
  return new LibI18nServiceDefault();
}
