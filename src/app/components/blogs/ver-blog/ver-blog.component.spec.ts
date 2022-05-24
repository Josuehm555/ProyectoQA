import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBlogComponent } from './ver-blog.component';

describe('VerBlogComponent', () => {
  let component: VerBlogComponent;
  let fixture: ComponentFixture<VerBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
