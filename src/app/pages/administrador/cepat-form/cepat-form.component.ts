import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cepat-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cepat-form.component.html',
  styleUrl: './cepat-form.component.scss',
})
export class CepatFormComponent {
  userModel = {
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    url_foto: '',
    correo: '',
    password: '',
    telefono: '',
    tipo_usuario_param: 37, // 37  es para cepat
    estatus: 24, // 24 es un usuario habilitado
  };

  constructor() {}

  /**
   * Se ejecuta al enviar el formulario.
   * @param form El formulario de Angular (NgForm).
   */
  onSubmit(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.invalid) {
      return;
    }
    console.log('JSON generado:');
    console.log(JSON.stringify(this.userModel, null, 2));
  }

  /**
   * Lógica para el botón de cancelar.
   */
  onCancel(): void {
    console.log('Operación cancelada.');
  }
}
