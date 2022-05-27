import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarBlogComponent } from './modificar-blog.component';

describe('ModificarBlogComponent', () => {
  let component: ModificarBlogComponent;
  let fixture: ComponentFixture<ModificarBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
