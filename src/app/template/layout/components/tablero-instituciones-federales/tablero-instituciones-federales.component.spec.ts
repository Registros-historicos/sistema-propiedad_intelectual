import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroInstitucionesFederalesComponent } from './tablero-instituciones-federales.component';

describe('TableroInstitucionesFederalesComponent', () => {
  let component: TableroInstitucionesFederalesComponent;
  let fixture: ComponentFixture<TableroInstitucionesFederalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroInstitucionesFederalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroInstitucionesFederalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
