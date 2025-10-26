import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepatFormComponent } from './cepat-form.component';

describe('CepatFormComponent', () => {
  let component: CepatFormComponent;
  let fixture: ComponentFixture<CepatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CepatFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CepatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
