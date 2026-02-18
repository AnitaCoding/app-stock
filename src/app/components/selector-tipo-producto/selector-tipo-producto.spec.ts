import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorTipoProducto } from './selector-tipo-producto';

describe('SelectorTipoProducto', () => {
  let component: SelectorTipoProducto;
  let fixture: ComponentFixture<SelectorTipoProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorTipoProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorTipoProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
