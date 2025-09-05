import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEstatusComponent } from './registro-estatus.component';

describe('RegistroEstatusComponent', () => {
  let component: RegistroEstatusComponent;
  let fixture: ComponentFixture<RegistroEstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
