import { TestBed } from '@angular/core/testing';

import { usuarioService } from './vistaperfil.service';

describe('VistaperfilService', () => {
  let service: usuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(usuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
