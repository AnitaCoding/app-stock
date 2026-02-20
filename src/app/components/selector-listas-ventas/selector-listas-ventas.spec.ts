import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorListasVentas } from './selector-listas-ventas';

describe('SelectorListasVentas', () => {
  let component: SelectorListasVentas;
  let fixture: ComponentFixture<SelectorListasVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorListasVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorListasVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
