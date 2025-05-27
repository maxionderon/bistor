import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStimItemTypesComponent } from './select-stim-item-types.component';

describe('SelectStimItemTypesComponent', () => {
  let component: SelectStimItemTypesComponent;
  let fixture: ComponentFixture<SelectStimItemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectStimItemTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStimItemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
