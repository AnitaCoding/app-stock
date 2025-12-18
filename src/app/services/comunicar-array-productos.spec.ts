import { TestBed } from '@angular/core/testing';

import { ComunicarArrayProductos } from './comunicar-array-productos';

describe('ComunicarArrayProductos', () => {
  let service: ComunicarArrayProductos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicarArrayProductos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
