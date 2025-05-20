import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBonusComponent } from './set-bonus.component';

describe('SetBonusComponent', () => {
  let component: SetBonusComponent;
  let fixture: ComponentFixture<SetBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetBonusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
