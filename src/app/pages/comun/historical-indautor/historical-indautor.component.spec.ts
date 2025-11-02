import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalIndautorComponent } from './historical-indautor.component';

describe('HistoricalIndautorComponent', () => {
  let component: HistoricalIndautorComponent;
  let fixture: ComponentFixture<HistoricalIndautorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalIndautorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalIndautorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
