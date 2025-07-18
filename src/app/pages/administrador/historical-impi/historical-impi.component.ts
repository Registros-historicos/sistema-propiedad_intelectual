import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from 'src/app/template/shared/shared.module';

@Component({
  selector: 'app-historical-impi',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './historical-impi.component.html',
  styleUrl: './historical-impi.component.scss',
})
export class HistoricalImpiComponent {
  form: FormGroup;
  years: (number | string)[] = [];
  fileName: string | null = null;
  file: File | null = null;
  isUploading = false;

  constructor(private fb: FormBuilder) {
    // Rango:2022 - Año actual
    const currentYear = new Date().getFullYear();
    this.years = ['Seleccionar todo'];
    for (let y = 2022; y <= currentYear; y++) {
      this.years.push(y);
    }

    this.form = this.fb.group({
      year: ['Seleccionar todo'],
      file: [null, [Validators.required, this.excelFileValidator]],
    });
  }

  onFileSelected(event: Event | DragEvent) {
    let file: File | null = null;
    if ('dataTransfer' in event && event.dataTransfer?.files.length) {
      file = event.dataTransfer.files[0];
    } else if (
      'target' in event &&
      (event.target as HTMLInputElement).files?.length
    ) {
      file = (event.target as HTMLInputElement).files![0];
    }
    if (file && this.isValidFile(file)) {
      this.file = file;
      this.fileName = file.name;
      this.form.patchValue({ file });
    }
  }

  isValidFile(file: File): boolean {
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const allowedExtensions = /\.(xls|xlsx)$/i;
    return (
      (allowedTypes.includes(file.type) || allowedExtensions.test(file.name)) &&
      file.size <= 50 * 1024 * 1024
    );
  }

  excelFileValidator(control: any): { [key: string]: boolean } | null {
    const file = control.value as File;
    if (file) {
      const allowedExtensions = /\.(xls|xlsx)$/i;
      if (!allowedExtensions.test(file.name)) {
        return { invalidFileType: true };
      }
    }
    return null;
  }

  removeFile() {
    this.file = null;
    this.fileName = null;
    this.form.patchValue({ file: null });
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.onFileSelected(event);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  submit() {
    if (this.form.valid && this.file) {
      this.isUploading = true;
      const formData = {
        year: this.form.get('year')?.value,
        fileName: this.fileName,
      };
      console.log(JSON.stringify(formData, null, 2));
      // Simulate upload
      setTimeout(() => {
        this.isUploading = false;
        this.removeFile();
        this.form.reset({
          year: this.years[this.years.length - 1],
          file: null,
        });
      }, 1500);
    }
  }

  cancel() {
    this.removeFile();
    this.form.patchValue({ file: null });
  }
}
