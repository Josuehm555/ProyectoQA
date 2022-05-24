import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuarioConsumidorComponent } from './ver-usuario-consumidor.component';

describe('VerUsuarioConsumidorComponent', () => {
  let component: VerUsuarioConsumidorComponent;
  let fixture: ComponentFixture<VerUsuarioConsumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUsuarioConsumidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUsuarioConsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
