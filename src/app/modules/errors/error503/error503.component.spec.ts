import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error503Component } from './error503.component';

describe('Error503Component', () => {
  let component: Error503Component;
  let fixture: ComponentFixture<Error503Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error503Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Error503Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
