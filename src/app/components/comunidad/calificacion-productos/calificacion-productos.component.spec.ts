import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionProductosComponent } from './calificacion-productos.component';

describe('CalificacionProductosComponent', () => {
  let component: CalificacionProductosComponent;
  let fixture: ComponentFixture<CalificacionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
