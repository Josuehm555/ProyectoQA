import { TestBed } from '@angular/core/testing';

import { SinSesionGuard } from './sin-sesion.guard';

describe('SinSesionGuard', () => {
  let guard: SinSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SinSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
