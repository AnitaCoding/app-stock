import { TestBed } from '@angular/core/testing';

import { ServicioAlertas } from './servicio-alertas';

describe('ServicioAlertas', () => {
  let service: ServicioAlertas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAlertas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
