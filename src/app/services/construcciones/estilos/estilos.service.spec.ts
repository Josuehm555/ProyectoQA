import { TestBed } from '@angular/core/testing';

import { EstilosService } from './estilos.service';

describe('EstilosService', () => {
  let service: EstilosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstilosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
