import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasVentas } from './listas-ventas';

describe('ListasVentas', () => {
  let component: ListasVentas;
  let fixture: ComponentFixture<ListasVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
