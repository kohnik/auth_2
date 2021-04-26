import { TestBed } from '@angular/core/testing';

import { SwithThemeService } from './swith-theme.service';

describe('SwithThemeService', () => {
  let service: SwithThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwithThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
