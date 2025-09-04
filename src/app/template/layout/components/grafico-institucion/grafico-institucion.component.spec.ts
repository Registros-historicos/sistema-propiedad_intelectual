import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoInstitucionComponent } from './grafico-institucion.component';

describe('GraficoInstitucionComponent', () => {
  let component: GraficoInstitucionComponent;
  let fixture: ComponentFixture<GraficoInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoInstitucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
