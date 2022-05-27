import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlantesComponent } from './parlantes.component';

describe('ParlantesComponent', () => {
  let component: ParlantesComponent;
  let fixture: ComponentFixture<ParlantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParlantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParlantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
