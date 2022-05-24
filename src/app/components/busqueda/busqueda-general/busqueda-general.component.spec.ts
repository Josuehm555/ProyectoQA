import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaGeneralComponent } from './busqueda-general.component';

describe('BusquedaGeneralComponent', () => {
  let component: BusquedaGeneralComponent;
  let fixture: ComponentFixture<BusquedaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
