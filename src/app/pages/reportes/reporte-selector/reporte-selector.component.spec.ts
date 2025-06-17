import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSelectorComponent } from './reporte-selector.component';

describe('ReporteSelectorComponent', () => {
  let component: ReporteSelectorComponent;
  let fixture: ComponentFixture<ReporteSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
