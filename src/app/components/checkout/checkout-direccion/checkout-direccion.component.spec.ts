import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDireccionComponent } from './checkout-direccion.component';

describe('CheckoutDireccionComponent', () => {
  let component: CheckoutDireccionComponent;
  let fixture: ComponentFixture<CheckoutDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutDireccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
