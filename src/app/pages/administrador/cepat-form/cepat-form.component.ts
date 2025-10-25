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

  // Ejecuta ambas peticiones en paralelo
  forkJoin({
    user: this.cepatService.createNewUserCepat(cepatData),
    cepat: this.cepatService.createNewCepat(cepat_name)
  }).subscribe({
    next: (response) => {
      console.log('✅ Ambas peticiones completadas:', response);
      this.cepatCreated = true;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('❌ Error en alguna petición:', err);
      this.cepatCreated = false;
      // Aquí podrías mostrar un mensaje de error en el UI:
      alert('Error al crear el usuario o el cepat.');
    }
  });
}

  onSubmit(form: NgForm): void {
    form.form.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    this.createNewCepat();
    // console.log('Formulario enviado:', cepatData);
    // console.log('Nombre del CEPAT:', cepat_name);
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

  /**
   * Agrega una institución a la lista de seleccionadas.
   * @param institucion La institución a agregar.
   */
  selectInstitution(institucion: Institutions): void {
    this.selectedInstitutions.push(institucion);
    this.searchTerm = ''; // Limpia el input de búsqueda
    this.filteredInstitutions = []; // Oculta la lista de resultados
  }

  /**
   * Remueve una institución de la lista de seleccionadas.
   * @param institucionToRemove La institución a remover.
   */
  removeInstitution(institucionToRemove: Institutions): void {
    this.selectedInstitutions = this.selectedInstitutions.filter(
      (inst) => inst.id_institucion !== institucionToRemove.id_institucion
    );
  }

  /**
   * Lógica para el botón de cancelar.
   */
  onCancel(): void {
    console.log('Operación cancelada.');
    // Aquí podrías añadir lógica para resetear el formulario o navegar a otra ruta.
  }

  /**
   * Finaliza el proceso, guardando las instituciones vinculadas.
   */
  finishProcess(): void {
    console.log('Proceso finalizado.');
    console.log(
      'Instituciones vinculadas:',
      this.selectedInstitutions.map((inst) => inst.institucion_nombre)
    );
    // Aquí harías la llamada a la API para guardar las vinculaciones y/o navegar a otra página.
    this.router.navigate(['/administrador/coordinadores']);
  }
}
