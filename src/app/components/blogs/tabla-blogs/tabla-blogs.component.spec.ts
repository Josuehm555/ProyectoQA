import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBlogsComponent } from './tabla-blogs.component';

describe('TablaBlogsComponent', () => {
  let component: TablaBlogsComponent;
  let fixture: ComponentFixture<TablaBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
