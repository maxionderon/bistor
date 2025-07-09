import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimComponent } from './stim.component';

describe('StimComponent', () => {
  let component: StimComponent;
  let fixture: ComponentFixture<StimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
