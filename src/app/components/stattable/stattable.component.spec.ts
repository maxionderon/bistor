import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StattableComponent } from './stattable.component';

describe('StattableComponent', () => {
  let component: StattableComponent;
  let fixture: ComponentFixture<StattableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StattableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StattableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
