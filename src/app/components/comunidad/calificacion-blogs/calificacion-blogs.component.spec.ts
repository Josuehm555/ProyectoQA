import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionBlogsComponent } from './calificacion-blogs.component';

describe('CalificacionBlogsComponent', () => {
  let component: CalificacionBlogsComponent;
  let fixture: ComponentFixture<CalificacionBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
