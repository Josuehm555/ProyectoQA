import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarModalComponent } from './confirmar-modal.component';

describe('ConfirmarModalComponent', () => {
  let component: ConfirmarModalComponent;
  let fixture: ComponentFixture<ConfirmarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
