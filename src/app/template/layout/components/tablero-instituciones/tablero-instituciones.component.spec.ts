import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroInstitucionesComponent } from './tablero-instituciones.component';

describe('TableroInstitucionesComponent', () => {
  let component: TableroInstitucionesComponent;
  let fixture: ComponentFixture<TableroInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroInstitucionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
