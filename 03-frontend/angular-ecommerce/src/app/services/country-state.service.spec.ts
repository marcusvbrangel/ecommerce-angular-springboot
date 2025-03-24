import { TestBed } from '@angular/core/testing';

import { CountryStateService } from './country-state.service';

describe('CountryStateService', () => {
  let service: CountryStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
