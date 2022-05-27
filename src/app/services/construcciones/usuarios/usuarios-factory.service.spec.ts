import { TestBed } from '@angular/core/testing';

import { UsuariosFactoryService } from './usuarios-factory.service';

describe('UsuariosFactoryService', () => {
  let service: UsuariosFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
