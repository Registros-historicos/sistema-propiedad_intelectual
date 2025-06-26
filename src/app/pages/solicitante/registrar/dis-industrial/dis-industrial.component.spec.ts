import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisIndustrialComponent } from './dis-industrial.component';

describe('DisIndustrialComponent', () => {
  let component: DisIndustrialComponent;
  let fixture: ComponentFixture<DisIndustrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisIndustrialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisIndustrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
