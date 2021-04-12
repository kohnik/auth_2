import { TestBed } from '@angular/core/testing';

import { AuthHomeGuardGuard } from './auth-home-guard.guard';

describe('AuthHomeGuardGuard', () => {
  let guard: AuthHomeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthHomeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
