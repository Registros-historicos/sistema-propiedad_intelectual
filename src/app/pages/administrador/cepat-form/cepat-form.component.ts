import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Cepat,
  CepatService,
  Estado,
  Institucion,
} from 'src/app/api/services/cepat.service';
import {
  Institutions,
  TablerosService,
} from 'src/app/api/services/tableros.service';
import { forkJoin, Observable } from 'rxjs';

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
  public cepatList: Cepat[] = [];
  public estados: Estado[] = [];
  public estadosSeleccionados: Estado[] = [];

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
    id_cepat: null as number | null,
  };

  constructor(
    private cepatService: CepatService,
    private cdr: ChangeDetectorRef,
    private institutionService: TablerosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllInstitutions();
    this.loadStates();
    this.loadCepats();
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

  loadCepats(): void {
    this.cepatService.getAllCepat().subscribe({
      next: (data) => {
        this.cepatList = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cepatList = [];
      },
    });
  }

  loadStates(): void {
    this.cepatService.getEstados().subscribe({
      next: (data) => {
        this.estados = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.estados = [];
      },
    });
  }

  createNewCepat(): void {
    const { id_cepat, ...userData } = this.userModel;
    this.cepatService.createNewUserCepat(userData).subscribe({
      next: (newUser) => {
        const idUsuario = newUser.id_usuario;
        if (!idUsuario || !id_cepat) {
          this.cepatCreated = false;
          return;
        }
        this.cepatService.updateCepatById(id_cepat, idUsuario).subscribe({
          next: () => {
            this.cepatCreated = true;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.cepatCreated = false;
          },
        });
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
    this.cepatCreated = true;
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
    this.assignStatesAndInstitutions();
  }

  assignStatesAndInstitutions(): void {
    const { id_cepat } = this.userModel;
    if (!id_cepat) {
      return;
    }
    if (!this.estadosSeleccionados || this.estadosSeleccionados.length === 0) {
      this.router.navigate(['/administrador/coordinadores']);
      return;
    }
    const observablesGet: Observable<Institucion[]>[] =
      this.estadosSeleccionados.map((estado) => {
        return this.cepatService.getInstitucionesPorEstado(
          estado.id_entidad_federativa
        );
      });

    forkJoin(observablesGet).subscribe({
      next: (resultados) => {
        const todasLasInstituciones: Institucion[] = resultados.reduce(
          (acc, val) => acc.concat(val),
          []
        );
        if (todasLasInstituciones.length === 0) {
          this.router.navigate(['/administrador/coordinadores']);
          return;
        }
        const observablesPut: Observable<any>[] = todasLasInstituciones.map(
          (institucion) => {
            return this.cepatService.actualizarInstitucionByIdCepat(
              institucion.id_institucion,
              id_cepat
            );
          }
        );
        forkJoin(observablesPut).subscribe({
          next: (resultadosPut) => {
            this.router.navigate(['/administrador/coordinadores']);
          },
          error: (errPut) => {},
        });
      },
      error: (errGet) => {},
    });
  }

  onSelectEstado(event: any): void {
    const idSeleccionado = Number(event.target.value);
    const estado = this.estados.find(
      (e) => e.id_entidad_federativa === idSeleccionado
    );
    if (estado) {
      const yaSeleccionado = this.estadosSeleccionados.some(
        (e) => e.id_entidad_federativa === estado.id_entidad_federativa
      );
      if (!yaSeleccionado) {
        this.estadosSeleccionados.push(estado);
      }
    }
    event.target.value = '';
  }

  removeEstado(estadoToRemove: Estado): void {
    this.estadosSeleccionados = this.estadosSeleccionados.filter(
      (e) => e.id_entidad_federativa !== estadoToRemove.id_entidad_federativa
    );
  }
}
