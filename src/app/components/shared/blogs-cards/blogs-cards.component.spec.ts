import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsCardsComponent } from './blogs-cards.component';

describe('BlogsCardsComponent', () => {
  let component: BlogsCardsComponent;
  let fixture: ComponentFixture<BlogsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
