import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigadoresComponent } from './investigadores.component';

describe('InvestigadoresComponent', () => {
  let component: InvestigadoresComponent;
  let fixture: ComponentFixture<InvestigadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
