import { TestBed } from '@angular/core/testing';

import { BucadorServiciosService } from './bucador.servicios.service';

describe('BucadorServiciosService', () => {
  let service: BucadorServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BucadorServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
