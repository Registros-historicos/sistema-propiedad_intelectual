import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasEducativosComponent } from './programas-educativos.component';

describe('ProgramasEducativosComponent', () => {
  let component: ProgramasEducativosComponent;
  let fixture: ComponentFixture<ProgramasEducativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramasEducativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramasEducativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
