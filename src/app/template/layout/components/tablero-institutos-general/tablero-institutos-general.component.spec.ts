import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroInstitutosGeneralComponent } from './tablero-institutos-general.component';

describe('TableroInstitutosGeneralComponent', () => {
  let component: TableroInstitutosGeneralComponent;
  let fixture: ComponentFixture<TableroInstitutosGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroInstitutosGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroInstitutosGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
