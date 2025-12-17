import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compraventa } from './compraventa';

describe('Compraventa', () => {
  let component: Compraventa;
  let fixture: ComponentFixture<Compraventa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compraventa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compraventa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
