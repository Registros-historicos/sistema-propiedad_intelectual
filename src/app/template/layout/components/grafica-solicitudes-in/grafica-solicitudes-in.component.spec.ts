import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaSolicitudesInComponent } from './grafica-solicitudes-in.component';

describe('GraficaSolicitudesInComponent', () => {
  let component: GraficaSolicitudesInComponent;
  let fixture: ComponentFixture<GraficaSolicitudesInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficaSolicitudesInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaSolicitudesInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
