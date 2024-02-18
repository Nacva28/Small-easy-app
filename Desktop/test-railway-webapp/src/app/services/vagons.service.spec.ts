import { TestBed } from '@angular/core/testing';

import { VagonsService } from './vagons.service';

describe('VagonsService', () => {
  let service: VagonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VagonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
