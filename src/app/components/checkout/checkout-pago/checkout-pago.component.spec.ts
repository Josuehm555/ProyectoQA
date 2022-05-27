import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPagoComponent } from './checkout-pago.component';

describe('CheckoutPagoComponent', () => {
  let component: CheckoutPagoComponent;
  let fixture: ComponentFixture<CheckoutPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
