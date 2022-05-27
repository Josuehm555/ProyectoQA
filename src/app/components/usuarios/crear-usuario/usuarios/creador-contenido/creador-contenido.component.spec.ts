import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorContenidoComponent } from './creador-contenido.component';

describe('CreadorContenidoComponent', () => {
  let component: CreadorContenidoComponent;
  let fixture: ComponentFixture<CreadorContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreadorContenidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
