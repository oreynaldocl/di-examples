import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { CustomI18nService } from './custom-i18n.service';

describe('CustomI18nService', () => {
  let guard: CustomI18nService;
  let translate: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const spyTranslate = jasmine.createSpyObj('TranslateService', ['stream']);
    TestBed.configureTestingModule({
      providers: [
        CustomI18nService,
        { provide: TranslateService, useValue: spyTranslate },
      ],
    });
    guard = TestBed.inject(CustomI18nService);
    translate = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be injected', () => {
    expect(guard).toBeTruthy();
  });

  describe('stream', () => {
    it('should call with key and undefined interpolateParams', () => {
      guard.stream('add');

      expect(translate.stream.calls.count()).toBe(1);
      expect(translate.stream.calls.argsFor(0)).toEqual(['add', undefined]);
    });

    it('should call with key and interpolateParams', () => {
      guard.stream('add', { name: 'first' });

      expect(translate.stream.calls.count()).toBe(1);
      expect(translate.stream.calls.argsFor(0)).toEqual(['add', { name: 'first' }]);
    });

  });
});
