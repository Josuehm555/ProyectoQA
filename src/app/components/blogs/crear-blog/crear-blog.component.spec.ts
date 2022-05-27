import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBlogComponent } from './crear-blog.component';

describe('CrearBlogComponent', () => {
  let component: CrearBlogComponent;
  let fixture: ComponentFixture<CrearBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
