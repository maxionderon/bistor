import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseLimitComponent } from './chose-limit.component';

describe('ChoseLimitComponent', () => {
  let component: ChoseLimitComponent;
  let fixture: ComponentFixture<ChoseLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoseLimitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoseLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
