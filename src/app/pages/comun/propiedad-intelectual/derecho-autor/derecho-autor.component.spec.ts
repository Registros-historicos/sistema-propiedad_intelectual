import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerechoAutorComponent } from './derecho-autor.component';

describe('DerechoAutorComponent', () => {
  let component: DerechoAutorComponent;
  let fixture: ComponentFixture<DerechoAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DerechoAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DerechoAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
