import { TestBed } from '@angular/core/testing';

import { CurrencyConversionApiService } from './currency-conversion-api.service';

describe('CurrencyConversionApiService', () => {
  let service: CurrencyConversionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConversionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
