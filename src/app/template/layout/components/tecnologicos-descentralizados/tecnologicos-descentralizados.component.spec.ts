import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TecnologicosDescentralizadosComponent } from './tecnologicos-descentralizados.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // por los mat-icon
import { TranslateModule } from '@ngx-translate/core'; // por el pipe translate

describe('TecnologicosDescentralizadosComponent', () => {
  let component: TecnologicosDescentralizadosComponent;
  let fixture: ComponentFixture<TecnologicosDescentralizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TecnologicosDescentralizadosComponent],
      imports: [
        CommonModule,
        MatIconModule,
        TranslateModule.forRoot() // evita error con "translate" en el template
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TecnologicosDescentralizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
