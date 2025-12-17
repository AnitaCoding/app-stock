import { TestBed } from '@angular/core/testing';

import { ComunicarDatos } from './comunicar-datos';

describe('ComunicarDatos', () => {
  let service: ComunicarDatos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicarDatos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
