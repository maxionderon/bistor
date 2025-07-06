import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemTypesComponent } from './select-item-types.component';

describe('SelectItemTypesComponent', () => {
  let component: SelectItemTypesComponent;
  let fixture: ComponentFixture<SelectItemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectItemTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectItemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
