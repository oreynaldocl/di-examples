import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
// import { Observable, of } from 'rxjs';
import { CustomI18nService } from './custom-i18n.service';

// class TranslateServiceStub {
//   stream(key: string | Array<string>, _interpolateParams?: Object): Observable<string | any> {
//     return of(key);
//   }
// }

describe('CustomI18nService', () => {
  let service: CustomI18nService;
  let translate: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const spyTranslate = jasmine.createSpyObj('TranslateService', ['stream']);
    TestBed.configureTestingModule({
      providers: [
        CustomI18nService,
        { provide: TranslateService, useValue: spyTranslate },
        // { provide: TranslateService, useClass: TranslateServiceStub },
      ],
    });
    service = TestBed.inject(CustomI18nService);
    translate = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be injected', () => {
    expect(service).toBeTruthy();
  });

  describe('stream', () => {
    it('should call with key and undefined interpolateParams', () => {
      service.stream('add');

      expect(translate.stream.calls.count()).toBe(1);
      expect(translate.stream.calls.argsFor(0)).toEqual(['add', undefined]);
    });

    it('should call with key and interpolateParams', () => {
      service.stream('add', { name: 'first' });

      expect(translate.stream.calls.count()).toBe(1);
      expect(translate.stream.calls.argsFor(0)).toEqual(['add', { name: 'first' }]);
    });

  });
});
