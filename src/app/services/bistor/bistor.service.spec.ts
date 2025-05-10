import { TestBed } from '@angular/core/testing';

import { BistorService } from './bistor.service';

describe('BistorService', () => {
  let service: BistorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BistorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
