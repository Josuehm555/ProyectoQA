import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaActivadaComponent } from './cuenta-activada.component';

describe('CuentaActivadaComponent', () => {
  let component: CuentaActivadaComponent;
  let fixture: ComponentFixture<CuentaActivadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaActivadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaActivadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
