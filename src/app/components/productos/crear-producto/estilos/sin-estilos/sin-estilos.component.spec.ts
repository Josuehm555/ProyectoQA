import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinEstilosComponent } from './sin-estilos.component';

describe('SinEstilosComponent', () => {
  let component: SinEstilosComponent;
  let fixture: ComponentFixture<SinEstilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinEstilosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinEstilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
