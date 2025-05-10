import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEnhancementComponent } from './select-enhancement.component';

describe('SelectEnhancementComponent', () => {
  let component: SelectEnhancementComponent;
  let fixture: ComponentFixture<SelectEnhancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEnhancementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEnhancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
