import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectModifierComponent } from './select-modifier.component';

describe('SelectModifierComponent', () => {
  let component: SelectModifierComponent;
  let fixture: ComponentFixture<SelectModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
