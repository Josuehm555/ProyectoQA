import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarModalComponent } from './eliminar-modal.component';

describe('EliminarModalComponent', () => {
  let component: EliminarModalComponent;
  let fixture: ComponentFixture<EliminarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
