import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosCategoriaComponent } from './registros-categoria.component';

describe('RegistrosCategoriaComponent', () => {
  let component: RegistrosCategoriaComponent;
  let fixture: ComponentFixture<RegistrosCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
