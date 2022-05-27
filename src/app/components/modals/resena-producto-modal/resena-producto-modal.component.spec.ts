import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaProductoModalComponent } from './resena-producto-modal.component';

describe('ResenaProductoModalComponent', () => {
  let component: ResenaProductoModalComponent;
  let fixture: ComponentFixture<ResenaProductoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResenaProductoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenaProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
