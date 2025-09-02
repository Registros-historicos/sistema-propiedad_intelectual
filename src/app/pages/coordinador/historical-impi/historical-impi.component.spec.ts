import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalImpiComponent } from './historical-impi.component';

describe('HistoricalImpiComponent', () => {
  let component: HistoricalImpiComponent;
  let fixture: ComponentFixture<HistoricalImpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalImpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalImpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
