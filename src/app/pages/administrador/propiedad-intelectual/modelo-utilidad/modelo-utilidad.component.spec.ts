import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloUtilidadComponent } from './modelo-utilidad.component';

describe('ModeloUtilidadComponent', () => {
  let component: ModeloUtilidadComponent;
  let fixture: ComponentFixture<ModeloUtilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeloUtilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeloUtilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
