import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: I18nFacadeServiceFactory,
})
export abstract class I18nFacadeService {
  abstract stream(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
  abstract get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
  abstract instant(key: string | Array<string>, interpolateParams?: Object): string;
}

@Injectable()
export class I18nFacadeServiceDefault extends I18nFacadeService {
  constructor() {
    super();
    console.log('LibI18nServiceDefault');
  }

  stream(key: string | Array<string>, _interpolateParams?: Object): Observable<string | any> {
    return of(this.getInvalidKey(key));
  }

  get(key: string | Array<string>, _interpolateParams?: Object): Observable<string | any> {
    return of(this.getInvalidKey(key));
  }

  instant(key: string | Array<string>, _interpolateParams?: Object): string {
    return this.getInvalidKey(key);
  }

  private getInvalidKey(key: string | Array<string>): string {
    return `*${key}`;
  }
}

export function I18nFacadeServiceFactory(): I18nFacadeService {
  return new I18nFacadeServiceDefault();
}
