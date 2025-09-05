import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosAnioComponent } from './registros-anio.component';

describe('RegistrosAnioComponent', () => {
  let component: RegistrosAnioComponent;
  let fixture: ComponentFixture<RegistrosAnioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosAnioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
