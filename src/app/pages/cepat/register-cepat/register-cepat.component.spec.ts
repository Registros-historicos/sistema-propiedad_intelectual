import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCepatComponent } from './register-cepat.component';

describe('RegisterCepatComponent', () => {
  let component: RegisterCepatComponent;
  let fixture: ComponentFixture<RegisterCepatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCepatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCepatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
