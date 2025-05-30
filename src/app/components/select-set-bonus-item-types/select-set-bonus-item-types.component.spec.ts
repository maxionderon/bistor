import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSetBonusItemTypesComponent } from './select-set-bonus-item-types.component';

describe('SelectSetBonusItemTypesComponent', () => {
  let component: SelectSetBonusItemTypesComponent;
  let fixture: ComponentFixture<SelectSetBonusItemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSetBonusItemTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSetBonusItemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
