import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroTop10InstitucionesComponent } from './tablero-top10-instituciones.component';

describe('TableroTop10InstitucionesComponent', () => {
  let component: TableroTop10InstitucionesComponent;
  let fixture: ComponentFixture<TableroTop10InstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroTop10InstitucionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroTop10InstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
