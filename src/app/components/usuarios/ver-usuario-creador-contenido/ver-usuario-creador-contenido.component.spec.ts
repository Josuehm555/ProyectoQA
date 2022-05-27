import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuarioCreadorContenidoComponent } from './ver-usuario-creador-contenido.component';

describe('VerUsuarioCreadorContenidoComponent', () => {
  let component: VerUsuarioCreadorContenidoComponent;
  let fixture: ComponentFixture<VerUsuarioCreadorContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUsuarioCreadorContenidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUsuarioCreadorContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
