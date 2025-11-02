import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalRegisterComponent } from './historical-register.component';

describe('HistoricalRegisterComponent', () => {
  let component: HistoricalRegisterComponent;
  let fixture: ComponentFixture<HistoricalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
