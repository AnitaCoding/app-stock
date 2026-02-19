import { TestBed } from '@angular/core/testing';

import { ServicioLocalstorage } from './servicio-localstorage';

describe('ServicioLocalstorage', () => {
  let service: ServicioLocalstorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioLocalstorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
