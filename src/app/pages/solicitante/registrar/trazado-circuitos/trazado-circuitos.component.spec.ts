import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazadoCircuitosComponent } from './trazado-circuitos.component';

describe('TrazadoCircuitosComponent', () => {
  let component: TrazadoCircuitosComponent;
  let fixture: ComponentFixture<TrazadoCircuitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrazadoCircuitosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrazadoCircuitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
