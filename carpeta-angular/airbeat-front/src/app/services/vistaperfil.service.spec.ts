import { TestBed } from '@angular/core/testing';

import { VistaperfilService } from './vistaperfil.service';

describe('VistaperfilService', () => {
  let service: VistaperfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistaperfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
