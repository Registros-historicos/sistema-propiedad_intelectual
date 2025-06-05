import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenoIndustrialComponent } from './diseno-industrial.component';

describe('DisenoIndustrialComponent', () => {
  let component: DisenoIndustrialComponent;
  let fixture: ComponentFixture<DisenoIndustrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisenoIndustrialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisenoIndustrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
