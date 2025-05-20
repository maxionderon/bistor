import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSetBonusComponent } from './select-set-bonus.component';

describe('SelectSetBonusComponent', () => {
  let component: SelectSetBonusComponent;
  let fixture: ComponentFixture<SelectSetBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSetBonusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSetBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
