import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatenteComponent } from './patente.component';

describe('PatenteComponent', () => {
  let component: PatenteComponent;
  let fixture: ComponentFixture<PatenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
