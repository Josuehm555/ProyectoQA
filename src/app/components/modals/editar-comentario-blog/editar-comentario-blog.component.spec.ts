import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComentarioBlogComponent } from './editar-comentario-blog.component';

describe('EditarComentarioBlogComponent', () => {
  let component: EditarComentarioBlogComponent;
  let fixture: ComponentFixture<EditarComentarioBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarComentarioBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComentarioBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
