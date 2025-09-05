import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaSectorComponent } from './grafica-sector.component';

describe('GraficaSectorComponent', () => {
  let component: GraficaSectorComponent;
  let fixture: ComponentFixture<GraficaSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficaSectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
