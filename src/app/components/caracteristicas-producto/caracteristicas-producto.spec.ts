import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasProducto } from './caracteristicas-producto';

describe('CaracteristicasProducto', () => {
  let component: CaracteristicasProducto;
  let fixture: ComponentFixture<CaracteristicasProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaracteristicasProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaracteristicasProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
