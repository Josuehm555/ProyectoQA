import { TestBed } from '@angular/core/testing';

import { RedireccionGuard } from './redireccion.guard';

describe('RedireccionGuard', () => {
  let guard: RedireccionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedireccionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
