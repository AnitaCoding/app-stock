import { TestBed } from '@angular/core/testing';

import { ServicioToasts } from './servicio-toasts';

describe('ServicioToasts', () => {
  let service: ServicioToasts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioToasts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
