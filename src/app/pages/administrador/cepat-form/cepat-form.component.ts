import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CepatService } from 'src/app/api/services/cepat.service';
import {
  Institutions,
  TablerosService,
} from 'src/app/api/services/tableros.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cepat-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cepat-form.component.html',
  styleUrls: ['./cepat-form.component.scss'],
})
export class CepatFormComponent implements OnInit {
  public cepatCreated = false;
  public searchTerm = '';
  public allInstitutions: Institutions[] = [];
  public filteredInstitutions: Institutions[] = [];
  public selectedInstitutions: Institutions[] = [];
  public confirmPassword = '';
  public passwordVisible = false;
  public confirmPasswordVisible = false;

  public userModel = {
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    url_foto: 'https://example.com/foto.png',
    correo: '',
    password: '',
    telefono: '',
    tipo_usuario_param: 37, // 37 es para cepatp.
    estatus: 24, // 24 es un usuario habilitado
    cepat_name: '',
  };

  constructor(
    private cepatService: CepatService,
    private cdr: ChangeDetectorRef,
    private institutionService: TablerosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllInstitutions();
  }

  getAllInstitutions(): void {
    this.institutionService.getAllInstitutions().subscribe({
      next: (data) => {
        this.allInstitutions = data;
        this.cdr.detectChanges();
      },
      error: () => {},
    });
  }

  createNewCepat(): void {
    const { cepat_name, ...cepatData } = this.userModel;
    forkJoin({
      user: this.cepatService.createNewUserCepat(cepatData),
      cepat: this.cepatService.createNewCepat(cepat_name),
    }).subscribe({
      next: (response) => {
        this.cepatCreated = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cepatCreated = false;
      },
    });
  }

  onSubmit(form: NgForm): void {
    const f = form.form;
    f.markAllAsTouched();
    if (f.invalid || this.userModel.password !== this.confirmPassword) return;
    this.createNewCepat();
    // this.cepatCreated = true;
  }

  onSearchInstitutions(): void {
    if (!this.searchTerm.trim()) {
      this.filteredInstitutions = [];
      return;
    }
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    const available = this.allInstitutions.filter(
      (inst) =>
        !this.selectedInstitutions.some(
          (selected) => selected.id_institucion === inst.id_institucion
        )
    );
    this.filteredInstitutions = available.filter((inst) =>
      inst.institucion_nombre.toLowerCase().includes(lowerCaseSearch)
    );
  }

  selectInstitution(institucion: Institutions): void {
    this.selectedInstitutions.push(institucion);
    this.searchTerm = '';
    this.filteredInstitutions = [];
  }

  removeInstitution(institucionToRemove: Institutions): void {
    this.selectedInstitutions = this.selectedInstitutions.filter(
      (inst) => inst.id_institucion !== institucionToRemove.id_institucion
    );
  }

  onCancel(): void {
    this.router.navigate(['/administrador/registro']);
  }

  finishProcess(): void {
    console.log(
      'Instituciones vinculadas:',
      this.selectedInstitutions.map((inst) => ({
        id: inst.id_institucion,
        nombre: inst.institucion_nombre,
      }))
    );
    this.router.navigate(['/administrador/coordinadores']);
  }
}
