import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConsulta } from './tabla-consulta';

describe('TablaConsulta', () => {
  let component: TablaConsulta;
  let fixture: ComponentFixture<TablaConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaConsulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
