import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosProductosComponent } from './comentarios-productos.component';

describe('ComentariosProductosComponent', () => {
  let component: ComentariosProductosComponent;
  let fixture: ComponentFixture<ComentariosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
