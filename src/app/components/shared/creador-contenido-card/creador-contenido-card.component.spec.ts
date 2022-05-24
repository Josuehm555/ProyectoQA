import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorContenidoCardComponent } from './creador-contenido-card.component';

describe('CreadorContenidoCardComponent', () => {
  let component: CreadorContenidoCardComponent;
  let fixture: ComponentFixture<CreadorContenidoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreadorContenidoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorContenidoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
