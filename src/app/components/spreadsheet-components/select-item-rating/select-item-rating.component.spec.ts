import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemRatingComponent } from './select-item-rating.component';

describe('SelectItemRatingComponent', () => {
  let component: SelectItemRatingComponent;
  let fixture: ComponentFixture<SelectItemRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectItemRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectItemRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
