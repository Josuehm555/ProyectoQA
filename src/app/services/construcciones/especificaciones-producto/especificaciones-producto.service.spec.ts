import { TestBed } from '@angular/core/testing';

import { EspecificacionesProductoService } from './especificaciones-producto.service';

describe('EspecificacionesProductoService', () => {
  let service: EspecificacionesProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecificacionesProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
