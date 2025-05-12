import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAugmentComponent } from './select-augment.component';

describe('SelectAugmentComponent', () => {
  let component: SelectAugmentComponent;
  let fixture: ComponentFixture<SelectAugmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAugmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAugmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
