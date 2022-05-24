import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCantidadProductoComponent } from './modificar-cantidad-producto.component';

describe('ModificarCantidadProductoComponent', () => {
  let component: ModificarCantidadProductoComponent;
  let fixture: ComponentFixture<ModificarCantidadProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCantidadProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCantidadProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
