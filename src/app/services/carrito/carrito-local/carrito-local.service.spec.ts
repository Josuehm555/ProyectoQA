import { TestBed } from '@angular/core/testing';

import { CarritoLocalService } from './carrito-local.service';

describe('CarritoLocalService', () => {
  let service: CarritoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
