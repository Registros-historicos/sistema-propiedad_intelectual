import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaSolicitudesComponent } from './grafica-solicitudes.component';

describe('GraficaSolicitudesComponent', () => {
  let component: GraficaSolicitudesComponent;
  let fixture: ComponentFixture<GraficaSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficaSolicitudesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
