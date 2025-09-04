import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuerposAcademicosComponent } from './cuerpos-academicos.component';

describe('CuerposAcademicosComponent', () => {
  let component: CuerposAcademicosComponent;
  let fixture: ComponentFixture<CuerposAcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuerposAcademicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuerposAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
