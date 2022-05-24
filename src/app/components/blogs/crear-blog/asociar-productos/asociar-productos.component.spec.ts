import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarProductosComponent } from './asociar-productos.component';

describe('AsociarProductosComponent', () => {
  let component: AsociarProductosComponent;
  let fixture: ComponentFixture<AsociarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
