import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorFormComponent } from './coordinator-form.component';

describe('CoordinatorFormComponent', () => {
  let component: CoordinatorFormComponent;
  let fixture: ComponentFixture<CoordinatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
