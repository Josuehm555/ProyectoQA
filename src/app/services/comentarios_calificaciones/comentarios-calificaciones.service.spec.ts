import { TestBed } from '@angular/core/testing';

import { ComentariosCalificacionesService } from './comentarios-calificaciones.service';

describe('ComentariosCalificacionesService', () => {
  let service: ComentariosCalificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentariosCalificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
