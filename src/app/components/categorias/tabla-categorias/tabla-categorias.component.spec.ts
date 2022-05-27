import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCategoriasComponent } from './tabla-categorias.component';

describe('TablaCategoriasComponent', () => {
  let component: TablaCategoriasComponent;
  let fixture: ComponentFixture<TablaCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
