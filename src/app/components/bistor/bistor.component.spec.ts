import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BistorComponent } from './bistor.component';

describe('BistorComponent', () => {
  let component: BistorComponent;
  let fixture: ComponentFixture<BistorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BistorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
