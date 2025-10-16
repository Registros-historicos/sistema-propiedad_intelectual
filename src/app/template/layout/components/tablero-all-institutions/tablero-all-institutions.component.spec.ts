import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAllInstitutionsComponent } from './tablero-all-institutions.component';

describe('TableroAllInstitutionsComponent', () => {
  let component: TableroAllInstitutionsComponent;
  let fixture: ComponentFixture<TableroAllInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroAllInstitutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroAllInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
