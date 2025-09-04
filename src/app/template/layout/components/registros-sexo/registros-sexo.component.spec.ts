import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosSexoComponent } from './registros-sexo.component';

describe('RegistrosSexoComponent', () => {
  let component: RegistrosSexoComponent;
  let fixture: ComponentFixture<RegistrosSexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosSexoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosSexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
