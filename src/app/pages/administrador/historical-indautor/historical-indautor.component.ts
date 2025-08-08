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
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/template/shared/shared.module';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-historical-indautor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './historical-indautor.component.html',
  styleUrl: './historical-indautor.component.scss',
})
export class HistoricalIndautorComponent {
  form: FormGroup;
  years: (number | string)[] = [];
  fileName: string | null = null;
  file: File | null = null;
  isUploading = false;
  excelData: any[] = [];
  excelHeaders: string[] = [];
  workbook: XLSX.WorkBook | null = null;
  availableSheets: string[] = [];
  sheetDataCache: Map<string, { headers: string[], data: any[] }> = new Map();

  constructor(private fb: FormBuilder) {
    // Rango: 2022 - Año actual
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

  async onFileSelected(event: Event | DragEvent) {
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

      this.sheetDataCache.clear();

      try {
        await this.loadExcelWorkbook();
        console.log('Workbook cargado exitosamente');
        console.log('Hojas disponibles:', this.availableSheets);
        await this.preloadAllSheets();
      } catch (error) {
        console.error('Error al cargar el workbook:', error);
        this.removeFile();
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar archivo',
          text: 'No se pudo leer el archivo Excel. Verifica que sea un archivo válido.',
        });
      }
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
    this.workbook = null;
    this.availableSheets = [];
    this.sheetDataCache.clear();
    this.form.patchValue({ file: null });
    this.excelData = [];
    this.excelHeaders = [];
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.onFileSelected(event);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  async loadExcelWorkbook(): Promise<void> {
    if (!this.file) {
      console.error('No hay archivo seleccionado');
      return;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const data = new Uint8Array(e.target.result);
          this.workbook = XLSX.read(data, {
            type: 'array',
            cellDates: true,
            cellNF: false,
            cellText: false
          });

          this.availableSheets = this.workbook.SheetNames;
          resolve();
        } catch (error) {
          console.error('Error al cargar el workbook:', error);
          reject(error);
        }
      };
      reader.onerror = (error) => {
        console.error('Error en FileReader:', error);
        reject(error);
      };
      reader.readAsArrayBuffer(this.file!);
    });
  }

  async preloadAllSheets(): Promise<void> {
    if (!this.workbook) return;

    for (const sheetName of this.availableSheets) {
      try {
        const { headers, data } = await this.readExcelSheet(sheetName);
        this.sheetDataCache.set(sheetName, { headers, data });
      } catch (error) {
        console.error(`Error pre-cargando hoja ${sheetName}:`, error);
      }
    }
  }

  async readExcelSheet(sheetName?: string): Promise<{ headers: string[], data: any[], sheetName: string }> {
    if (!this.workbook) {
      return { headers: [], data: [], sheetName: '' };
    }

    try {
      let targetSheetName = sheetName || this.workbook.SheetNames[0];

      if (this.sheetDataCache.has(targetSheetName)) {
        const cached = this.sheetDataCache.get(targetSheetName)!;
        return { ...cached, sheetName: targetSheetName };
      }

      if (!this.workbook.Sheets[targetSheetName]) {
        throw new Error(`La hoja "${targetSheetName}" no existe en el archivo`);
      }

      const sheet = this.workbook.Sheets[targetSheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: '',
        blankrows: false,
        range: 4
      });

      if (jsonData.length === 0) {
        return { headers: [], data: [], sheetName: targetSheetName };
      }

      const headers = (jsonData[0] as any[]).map((h, i) => {
        if (i === 0) return null;
        return h !== undefined && h !== null ? String(h).trim() : 'Columna sin nombre';
      }).filter(h => h !== null);

      const rows = jsonData.slice(1).map(row => {
        if (Array.isArray(row)) {
          return row.slice(1).map(cell => {
            if (typeof cell === 'number' && cell > 25569 && cell < 60000) {
              const date = XLSX.SSF.parse_date_code(cell);
              if (date) {
                return `${date.d}/${date.m}/${date.y}`;
              }
            }
            return cell;
          });
        }
        return row;
      });

      this.sheetDataCache.set(targetSheetName, { headers, data: rows });
      return { headers, data: rows, sheetName: targetSheetName };
    } catch (error) {
      console.error('Error al leer la hoja:', error);
      throw error;
    }
  }

  getSheetNameForYear(year: string | number): string | null {
    if (!this.availableSheets || this.availableSheets.length === 0) {
      return null;
    }

    if (year === 'Seleccionar todo') {
      return null;
    }

    const yearStr = year.toString();
    const exactMatch = this.availableSheets.find(sheet =>
      sheet === yearStr || sheet === `${yearStr}` || sheet === `Hoja${yearStr}`
    );
    if (exactMatch) return exactMatch;

    const containsYear = this.availableSheets.find(sheet =>
      sheet.toLowerCase().includes(yearStr.toLowerCase())
    );
    if (containsYear) return containsYear;

    const patterns = [
      new RegExp(`^${yearStr}[_\\-\\s]`, 'i'),
      new RegExp(`[_\\-\\s]${yearStr}$`, 'i'),
      new RegExp(`[_\\-\\s]${yearStr}[_\\-\\s]`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = this.availableSheets.find(sheet => pattern.test(sheet));
      if (match) return match;
    }

    if (this.availableSheets.length === 1) {
      return this.availableSheets[0];
    }

    return null;
  }

  async previewExcel() {
    if (!this.file || !this.workbook) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay archivo cargado',
        text: 'Por favor, selecciona un archivo Excel primero.',
      });
      return;
    }

    const selectedYear = this.form.get('year')?.value;

    try {
      let showLoading = true;
      if (selectedYear === 'Seleccionar todo') {
        showLoading = !this.availableSheets.every(sheet => this.sheetDataCache.has(sheet));
      } else {
        const targetSheetName = this.getSheetNameForYear(selectedYear);
        showLoading = !(targetSheetName && this.sheetDataCache.has(targetSheetName));
      }

      if (showLoading) {
        Swal.fire({
          title: 'Cargando vista previa...',
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
      }

      if (selectedYear === 'Seleccionar todo') {
        const allSheetsData = [];
        for (const sheetName of this.availableSheets) {
          const { headers, data } = await this.readExcelSheet(sheetName);
          allSheetsData.push({
            sheetName,
            headers,
            data: data.slice(0, 5),
            totalRecords: data.length
          });
        }

        if (showLoading) Swal.close();
        await this.showAllSheetsPreview(allSheetsData);
      } else {
        const targetSheetName = this.getSheetNameForYear(selectedYear);
        if (targetSheetName) {
          const { headers, data, sheetName } = await this.readExcelSheet(targetSheetName);
          this.excelHeaders = headers;
          this.excelData = data;
          if (showLoading) Swal.close();
          await this.showSheetPreview(headers, data, sheetName);
        } else {
          if (showLoading) Swal.close();
          await this.handleSheetNotFound(selectedYear);
        }
      }
    } catch (error) {
      console.error('Error al leer el archivo Excel:', error);
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo leer el archivo. Asegúrate de que sea un archivo Excel válido.',
      });
    }
  }

  async handleSheetNotFound(year: string | number) {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Hoja no encontrada',
      html: `
        <p>No se encontró una hoja específica para el año <strong>${year}</strong>.</p>
        <p class="mt-2">Hojas disponibles en el archivo:</p>
        <ul class="list-group list-group-flush mt-2">
          ${this.availableSheets.map(sheet =>
        `<li class="list-group-item">${sheet}</li>`
      ).join('')}
        </ul>
      `,
      showCancelButton: true,
      confirmButtonText: 'Seleccionar hoja',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      await this.showSheetSelector();
    }
  }

  async showSheetSelector() {
    if (!this.availableSheets || this.availableSheets.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay hojas disponibles',
        text: 'El archivo no contiene hojas para seleccionar.',
      });
      return;
    }

    const sheetOptionsHtml = await Promise.all(
      this.availableSheets.map(async (sheet) => {
        try {
          const { data } = await this.readExcelSheet(sheet);
          return `<option value="${sheet}">${sheet} (${data.length} registros)</option>`;
        } catch {
          return `<option value="${sheet}">${sheet}</option>`;
        }
      })
    );

    const { value: selectedSheet } = await Swal.fire({
      title: 'Seleccionar hoja a previsualizar',
      html: `
        <div class="mb-3">
          <label class="form-label">Hojas disponibles en el archivo:</label>
          <select id="sheetSelector" class="form-select" size="5">
            ${sheetOptionsHtml.join('')}
          </select>
        </div>
        <div class="alert alert-info mt-3">
          <small>
            <i class="bi bi-info-circle me-1"></i>
            Selecciona la hoja que corresponde al año o datos que deseas visualizar
          </small>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ver vista previa',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      preConfirm: () => {
        const select = document.getElementById('sheetSelector') as HTMLSelectElement;
        return select.value;
      }
    });

    if (selectedSheet) {
      Swal.fire({
        title: 'Cargando hoja...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });

      const { headers, data, sheetName } = await this.readExcelSheet(selectedSheet);
      this.excelHeaders = headers;
      this.excelData = data;

      Swal.close();
      await this.showSheetPreview(headers, data, sheetName);
    }
  }

  async showSheetPreview(headers: string[], data: any[], sheetName: string) {
    const previewData = data.slice(0, 15);
    const totalRecords = data.length;

    let tableHtml = `
      <div class="alert alert-info mb-3">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Hoja:</strong> ${sheetName} |
        <strong>Total de registros:</strong> ${totalRecords} |
        <strong>Columnas:</strong> ${headers.length}
      </div>
      <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
        <table class="table table-bordered table-striped table-hover table-sm">
    `;

    tableHtml += '<thead class="table-primary sticky-top"><tr><th>#</th>';
    for (const header of headers) {
      tableHtml += `<th>${this.escapeHtml(header || 'Columna vacía')}</th>`;
    }
    tableHtml += '</tr></thead>';

    tableHtml += '<tbody>';
    for (let rowIndex = 0; rowIndex < previewData.length; rowIndex++) {
      const row = previewData[rowIndex];
      tableHtml += `<tr><td class="text-muted">${rowIndex + 1}</td>`;
      for (let i = 0; i < headers.length; i++) {
        const cellValue = row[i] !== undefined && row[i] !== null ? row[i] : '';
        const displayValue = this.formatCellValue(cellValue);
        tableHtml += `<td>${this.escapeHtml(displayValue)}</td>`;
      }
      tableHtml += '</tr>';
    }

    if (totalRecords > previewData.length) {
      tableHtml += `
        <tr class="table-secondary">
          <td colspan="${headers.length + 1}" class="text-center text-muted">
            <em>... ${totalRecords - previewData.length} registros más ...</em>
          </td>
        </tr>
      `;
    }

    tableHtml += '</tbody></table></div>';

    await Swal.fire({
      title: `Vista previa: ${this.fileName}`,
      html: tableHtml,
      width: '95%',
      heightAuto: false,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3085d6',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster'
      },
      customClass: {
        htmlContainer: 'p-0',
        container: 'large-swal-container',
        popup: 'large-height-swal'
      },
      scrollbarPadding: false
    });
  }

  async showAllSheetsPreview(sheetsData: any[]) {
    let html = `
    <div class="alert alert-info mb-3">
      <i class="bi bi-info-circle me-2"></i>
      <strong>Archivo:</strong> ${this.fileName} |
      <strong>Total de hojas:</strong> ${sheetsData.length}
    </div>
    <div class="mb-3">
      <ul class="nav nav-tabs" id="sheetsTabs" role="tablist">
    `;

    sheetsData.forEach((sheet, index) => {
      const activeClass = index === 0 ? 'active' : '';
      html += `
      <li class="nav-item" role="presentation">
        <button class="nav-link ${activeClass}"
                id="tab-${index}"
                data-bs-toggle="tab"
                data-bs-target="#sheet-${index}"
                type="button"
                role="tab"
                aria-controls="sheet-${index}"
                aria-selected="${index === 0 ? 'true' : 'false'}">
          ${sheet.sheetName} (${sheet.totalRecords})
        </button>
      </li>
    `;
    });
    html += `</ul></div>`;

    html += `<div class="tab-content" id="sheetsTabsContent">`;
    sheetsData.forEach((sheet, index) => {
      const activeClass = index === 0 ? 'show active' : '';
      html += `
      <div class="tab-pane fade ${activeClass}"
           id="sheet-${index}"
           role="tabpanel"
           aria-labelledby="tab-${index}">
        ${this.createSheetPreviewTable(sheet)}
      </div>
    `;
    });
    html += `</div>`;

    await Swal.fire({
      title: `Vista previa de todas las hojas: ${this.fileName}`,
      html: html,
      width: '95%',
      heightAuto: false,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3085d6',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster'
      },
      customClass: {
        htmlContainer: 'p-0',
        container: 'large-swal-container',
        popup: 'large-height-swal'
      },
      scrollbarPadding: false,
      didOpen: () => {
        const tabEls = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabEls.forEach(tabEl => {
          tabEl.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const target = (e.currentTarget as HTMLElement).getAttribute('data-bs-target');
            if (target) {
              document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
              });
              document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
              });
              (e.currentTarget as HTMLElement).classList.add('active');
              document.querySelector(target)?.classList.add('show', 'active');
            }
          });
        });
      }
    });
  }

  private createSheetPreviewTable(sheet: any): string {
    const previewData = sheet.data.slice(0, 5);
    const hasMoreData = sheet.totalRecords > 5;

    let tableHtml = `
    <div class="table-responsive" style="max-height: 350px; overflow-y: auto;">
      <table class="table table-bordered table-striped table-hover table-sm">
    `;

    tableHtml += '<thead class="table-primary sticky-top"><tr><th>#</th>';
    for (const header of sheet.headers) {
      tableHtml += `<th>${this.escapeHtml(header || 'Columna vacía')}</th>`;
    }
    tableHtml += '</tr></thead>';

    tableHtml += '<tbody>';
    for (let rowIndex = 0; rowIndex < previewData.length; rowIndex++) {
      const row = previewData[rowIndex];
      tableHtml += `<tr><td class="text-muted">${rowIndex + 1}</td>`;
      for (let i = 0; i < sheet.headers.length; i++) {
        const cellValue = row[i] !== undefined && row[i] !== null ? row[i] : '';
        const displayValue = this.formatCellValue(cellValue);
        tableHtml += `<td>${this.escapeHtml(displayValue)}</td>`;
      }
      tableHtml += '</tr>';
    }

    if (hasMoreData) {
      tableHtml += `
      <tr class="table-secondary">
        <td colspan="${sheet.headers.length + 1}" class="text-center text-muted">
          <em>... ${sheet.totalRecords - 5} registros más ...</em>
        </td>
      </tr>
    `;
    }

    tableHtml += '</tbody></table></div>';
    return tableHtml;
  }

  formatCellValue(value: any): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return value.toString();
      }
      return value.toFixed(2);
    }

    if (value instanceof Date) {
      return value.toLocaleDateString('es-MX');
    }

    return String(value);
  }

  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async downloadTemplate() {
    try {
      const templateUrl = 'assets/Excel/INDAUTOR.xlsx';

      const response = await fetch(templateUrl);

      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo de plantilla.');
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'plantilla-INDAUTOR.xlsx';
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      Swal.fire({
        icon: 'success',
        title: 'Descarga iniciada',
        text: 'La plantilla se está descargando.',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error al descargar la plantilla:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo descargar la plantilla. Por favor, inténtalo de nuevo.',
      });
    }
  }

  async submit() {
    if (this.form.valid && this.file) {
      this.isUploading = true;
      const selectedYear = this.form.get('year')?.value;

      let recordCount = 0;
      let sheetsInfo = '';
      let dataToUpload: any[] = [];

      try {
        if (selectedYear === 'Seleccionar todo') {
          const allData: any[] = [];
          for (const sheetName of this.availableSheets) {
            const { headers, data } = await this.readExcelSheet(sheetName);
            allData.push({
              sheetName,
              headers,
              data,
              recordCount: data.length
            });
            recordCount += data.length;
          }
          dataToUpload = allData;
          sheetsInfo = `Todas las hojas (${this.availableSheets.length}): ${this.availableSheets.join(', ')}`;
        } else {
          const targetSheetName = this.getSheetNameForYear(selectedYear);
          if (targetSheetName) {
            const { headers, data } = await this.readExcelSheet(targetSheetName);
            recordCount = data.length;
            sheetsInfo = `Hoja: ${targetSheetName}`;
            dataToUpload = [{
              sheetName: targetSheetName,
              headers,
              data,
              recordCount
            }];
          } else {
            throw new Error(`No se encontró hoja para el año ${selectedYear}`);
          }
        }

        const formData = {
          year: selectedYear,
          fileName: this.fileName,
          totalRecords: recordCount,
          sheetsInfo: sheetsInfo,
          sheets: dataToUpload
        };

        console.log('Datos a enviar:', {
          year: formData.year,
          fileName: formData.fileName,
          totalRecords: formData.totalRecords,
          sheetsInfo: formData.sheetsInfo,
          sheetsCount: formData.sheets.length
        });

        // Simular envío
        setTimeout(() => {
          this.isUploading = false;
          Swal.fire({
            icon: 'success',
            title: '¡Carga exitosa!',
            html: `
              <div class="text-start">
                <p><strong>Archivo:</strong> ${this.fileName}</p>
                <p><strong>Año:</strong> ${selectedYear}</p>
                <p><strong>Registros procesados:</strong> ${recordCount.toLocaleString()}</p>
                <p class="small text-muted mt-2">${sheetsInfo}</p>
              </div>
            `,
            confirmButtonColor: '#28a745',
          }).then(() => {
            this.removeFile();
            this.form.reset({
              year: 'Seleccionar todo',
              file: null,
            });
          });
        }, 2000);
      } catch (error) {
        console.error('Error al procesar el archivo:', error);
        this.isUploading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al procesar',
          text: error instanceof Error ? error.message : 'Ocurrió un error al procesar el archivo',
        });
      }
    }
  }

  cancel() {
    this.removeFile();
    this.form.reset({
      year: 'Seleccionar todo',
      file: null,
    });
  }
}
