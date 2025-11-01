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
import { NavigationService } from 'src/app/pages/comun/navigation.service';
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
  backRoute: string = '';

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

  readonly EXCLUDED_SHEETS = [
    'INSTRUCTIVO',
    'PRIMARIO',
    'SECUNDARIO',
    'TERCIARIO',
    'CUATERNARIO',
    'QUINARIO',
    'CLASIFICACIONES'
  ];

 private readonly EXPECTED_YEAR_HEADERS = [
    'N. Expediente(1)',         // B6
    'Título (2)',               // D6
    'Descripción (3)',          // E6
    'Fecha de Solicitud (4)',   // F6
    'N. de Certificado (5)',    // G6
    'Estatus (6)',              // H6
    'Rama (7)',                 // I6
    'Medio de Ingreso (8)',     // J6
    'Tecnologico de Origen (9)', // K6
    'Año renovación (10)',      // L6
    'Tipo de Sector (11)',      // M6
    'Sector (12)',              // N6
    'Subsector (13)',           // O6
    'Autores (14)',             // P6
    'Fecha de Expedición (15)', // Q6
    'Archivo (16)',             // R6
    'Observaciones (17)'        // S6
  ];

  private readonly EXPECTED_AUTHORS_HEADERS = [
    'CURP (18)',                  // B6
    'Nombres (19)',               // C6
    'Apellido Paterno (20)',      // D6
    'Apellido Materno (21)',      // E6
    'Sexo (22)',                  // F6
    'Tipo de investigador (23)',  // G6
    'Institución (24)',           // H6
    'Programa Educativo (25)',    // I6
    'Cuerpo Academico (26)',      // J6
    'Departamento (27)',          // K6
    'Fecha de Afiliación (28)',   // L6
    'Fecha de Fin (29)',          // M6
    'Observaciones (30)'          // N6
  ];

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {
    this.backRoute = this.navigationService.getHistoricalRecordsRoute();

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

  regresarAHistoricos(): void {
    this.navigationService.navigateToHistoricalRecords();
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

    console.log('Cargando workbook del archivo:', this.file.name);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const data = new Uint8Array(e.target.result);
          console.log('Archivo leído, tamaño:', data.length, 'bytes');

          this.workbook = XLSX.read(data, {
            type: 'array',
            cellDates: true,
            cellNF: false,
            cellText: false
          });

          this.availableSheets = this.workbook.SheetNames;

          console.log('Workbook cargado exitosamente');
          console.log('Hojas disponibles:', this.availableSheets);

          this.availableSheets.forEach(sheetName => {
            const sheet = this.workbook!.Sheets[sheetName];
            const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
            const rowCount = range.e.r - range.s.r + 1;
            console.log(`Hoja "${sheetName}": ${rowCount} filas`);
          });

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
      let targetSheetName = sheetName;

      if (!targetSheetName) {
        targetSheetName = this.workbook.SheetNames[0];
      }

      if (this.sheetDataCache.has(targetSheetName)) {
        const cached = this.sheetDataCache.get(targetSheetName)!;
        return {...cached, sheetName: targetSheetName};
      }

      if (!this.workbook.Sheets[targetSheetName]) {
        throw new Error(`La hoja "${targetSheetName}" no existe en el archivo`);
      }

      const sheet = this.workbook.Sheets[targetSheetName];
      const headerRow = 5; // Fila 6 (índice 5)
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: '',
        blankrows: false,
        range: headerRow
      });

      if (jsonData.length === 0) {
        return { headers: [], data: [], sheetName: targetSheetName };
      }

      const headers = (jsonData[0] as any[]).map((h, i) => {
        if (i === 0) return null; // Omitir columna A
        return h !== undefined && h !== null ? String(h).trim() : '';
      }).filter(h => h !== null);

      const rows = jsonData.slice(1).map(row => {
        if (Array.isArray(row)) {
          return row.slice(1).map(cell => {
            if (typeof cell === 'number' && cell > 25569 && cell < 60000) {
              try {
                return this.formatExcelDate(cell);
              } catch (e) {
                return cell;
              }
            }
            return cell !== undefined && cell !== null ? String(cell).trim() : '';
          });
        }
        return [];
      }).filter(row => row.some(cell => cell !== ''));

      console.log(`Hoja "${targetSheetName}":`, {
        totalHeaders: headers.length,
        headers: headers.slice(0, 5),
        totalDataRows: rows.length,
        sampleRow: rows[0]?.slice(0, 5)
      });

      return { headers, data: rows, sheetName: targetSheetName };
    } catch (error) {
      console.error(`Error leyendo hoja "${sheetName}":`, error);
      throw error;
    }
  }

  formatExcelDate(serialDate: number): string {
    try {
      const excelEpoch = new Date(1900, 0, 1);
      excelEpoch.setDate(excelEpoch.getDate() + serialDate - 2);
      return excelEpoch.toLocaleDateString('es-MX');
    } catch (error) {
      return serialDate.toString();
    }
  }

  getPreviewableSheets(): string[] {
    return this.availableSheets.filter(sheet =>
      !this.EXCLUDED_SHEETS.includes(sheet.toUpperCase())
    );
  }

  async previewExcel() {
    if (!this.workbook) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay archivo cargado para mostrar vista previa',
      });
      return;
    }

    try {
      const previewableSheets = this.getPreviewableSheets();

      if (previewableSheets.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Sin datos para previsualizar',
          text: 'No se encontraron hojas de datos válidas para mostrar',
        });
        return;
      }

      const previewData: any[] = [];

      for (const sheetName of previewableSheets) {
        try {
          const { headers, data } = await this.readExcelSheet(sheetName);
          const previewRows = data.slice(0, 10);

          previewData.push({
            sheetName,
            headers,
            data: previewRows,
            totalRows: data.length,
            isExcluded: false
          });
        } catch (error) {
          console.error(`Error leyendo hoja ${sheetName} para vista previa:`, error);
          previewData.push({
            sheetName,
            headers: [],
            data: [],
            totalRows: 0,
            error: `Error al leer la hoja: ${error}`,
            isExcluded: false
          });
        }
      }

      const excludedSheets = this.availableSheets.filter(sheet =>
        this.EXCLUDED_SHEETS.includes(sheet.toUpperCase())
      );

      this.showPreviewModal(previewData, excludedSheets);

    } catch (error) {
      console.error('Error en vista previa:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en vista previa',
        text: 'No se pudo generar la vista previa del archivo',
      });
    }
  }

  private showPreviewModal(previewData: any[], excludedSheets: string[]) {
    const createTableHtml = (item: any) => {
      if (item.error) {
        return `<div class="alert alert-danger">${item.error}</div>`;
      }

      if (item.headers.length === 0) {
        return '<div class="alert alert-warning">Sin datos disponibles</div>';
      }

      const headerRow = item.headers.map((h: string) => `<th class="px-2 py-1 bg-light border text-start small">${this.escapeHtml(h)}</th>`).join('');
      const dataRows = item.data.map((row: any[]) => {
        const cells = row.map((cell: any) => {
          const cellValue = cell !== null && cell !== undefined ? String(cell) : '';
          const displayValue = cellValue.length > 30 ? cellValue.substring(0, 30) + '...' : cellValue;
          return `<td class="px-2 py-1 border text-start small">${this.escapeHtml(displayValue)}</td>`;
        }).join('');
        return `<tr>${cells}</tr>`;
      }).join('');

      return `
        <div class="table-responsive mb-3">
          <table class="table table-sm table-bordered">
            <thead><tr>${headerRow}</tr></thead>
            <tbody>${dataRows}</tbody>
          </table>
          <small class="text-muted">Mostrando ${item.data.length} de ${item.totalRows} registros</small>
        </div>
      `;
    };

    const tabsHtml = previewData.map((item, index) =>
      `<li class="nav-item">
        <button class="nav-link ${index === 0 ? 'active' : ''}" type="button" data-tab-index="${index}">
          ${this.escapeHtml(item.sheetName)} (${item.totalRows})
        </button>
      </li>`
    ).join('');

    const contentHtml = previewData.map((item, index) =>
      `<div class="tab-pane ${index === 0 ? 'show active' : ''}" id="tab-${index}">
        <h6 class="mb-3">Hoja: ${this.escapeHtml(item.sheetName)}</h6>
        ${createTableHtml(item)}
      </div>`
    ).join('');

    const excludedInfo = excludedSheets.length > 0 ?
      `<div class="alert alert-info mb-3">
        <small><strong>Hojas excluidas de la vista previa:</strong> ${excludedSheets.join(', ')}</small>
      </div>` : '';

    Swal.fire({
      title: `Vista previa: ${this.fileName}`,
      html: `
        ${excludedInfo}
        <div class="text-start">
          <ul class="nav nav-tabs mb-3" id="preview-tabs">${tabsHtml}</ul>
          <div class="tab-content" id="preview-tab-content">${contentHtml}</div>
        </div>
      `,
      width: '90%',
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        container: 'swal-wide'
      },
      didOpen: () => {
        const tabButtons = document.querySelectorAll('#preview-tabs button[data-tab-index]');
        const tabPanes = document.querySelectorAll('#preview-tab-content .tab-pane');

        tabButtons.forEach((tabButton) => {
          tabButton.addEventListener('click', (e) => {
            e.preventDefault();

            const clickedButton = e.target as HTMLButtonElement;
            const tabIndex = clickedButton.getAttribute('data-tab-index');

            if (tabIndex !== null) {
              tabButtons.forEach(btn => btn.classList.remove('active'));
              tabPanes.forEach(pane => {
                pane.classList.remove('show', 'active');
              });

              clickedButton.classList.add('active');
              const targetPane = document.querySelector(`#tab-${tabIndex}`);
              if (targetPane) {
                targetPane.classList.add('show', 'active');
              }
            }
          });
        });
      }
    });
  }

  private escapeHtml(text: string): string {
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
      link.download = 'Plantilla_INDAUTOR.xlsx';
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

  getSheetNameForYear(year: number | string): string | null {
    if (typeof year === 'string') return null;
    return this.availableSheets.find(name =>
      name.includes(year.toString()) || name === year.toString()
    ) || null;
  }

  async submit() {
    if (this.form.invalid || !this.file) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor selecciona un año y un archivo válido',
      });
      return;
    }

    const selectedYear = this.form.get('year')?.value;

    if (!this.workbook) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha cargado correctamente el archivo Excel',
      });
      return;
    }

    this.isUploading = true;

    try {
      let dataToUpload: any[] = [];
      let recordCount = 0;
      let sheetsInfo = '';

      const isTemplateValid = await this.validateTemplateHeaders();
      if (!isTemplateValid) {
        this.isUploading = false;
        return;
      }

      if (selectedYear === 'Seleccionar todo') {
        const allData: any[] = [];
        const processableSheets = this.getPreviewableSheets();

        for (const sheetName of processableSheets) {
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
        sheetsInfo = `Hojas procesadas (${processableSheets.length}): ${processableSheets.join(', ')}`;
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

      // Aquí llamada al servicio para enviar los datos
      // await this.historicalIndautorService.uploadData(formData);

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

  cancel() {
    this.removeFile();
    this.form.reset({
      year: 'Seleccionar todo',
      file: null,
    });
  }

  private async loadTemplateWorkbook(): Promise<XLSX.WorkBook> {
    const templateUrl = 'assets/Excel/INDAUTOR.xlsx';
    const res = await fetch(templateUrl);
    if (!res.ok) throw new Error('No se pudo cargar la plantilla INDAUTOR.xlsx');
    const buf = await res.arrayBuffer();
    return XLSX.read(new Uint8Array(buf), { type: 'array', cellDates: true });
  }

  private extractTemplateHeaders(wb: XLSX.WorkBook, sheetName: string): string[] {
    const sheet = wb.Sheets[sheetName];
    if (!sheet) return [];

    const headerRow = 5;

    const json = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: '',
      blankrows: false,
      range: headerRow
    }) as any[][];

    if (!json.length) return [];
    const hdrRow = json[0] ?? [];

    return hdrRow
      .map((h, i) => (i === 0 ? null : (h !== undefined && h !== null ? String(h).trim() : '')))
      .filter((h) => h !== null) as string[];
  }
  private normalizeHeader(header: string): string {
    return header
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/\s+/g, ' ') // Espacios múltiples a uno
      .trim()
      .toLowerCase();
  }

  private compareHeaders(expected: string[], actual: string[]) {
    const normalizeArray = (arr: string[]) => arr.map(h => this.normalizeHeader(h));

    const expectedNorm = normalizeArray(expected);
    const actualNorm = normalizeArray(actual);

    console.log('COMPARACIÓN DE ENCABEZADOS:');
    console.log('Esperados normalizados:', expectedNorm);
    console.log('Actuales normalizados:', actualNorm);

    const expectedFiltered = expectedNorm.filter(h => h !== '');
    const actualFiltered = actualNorm.filter(h => h !== '');

    console.log('Esperados filtrados:', expectedFiltered);
    console.log('Actuales filtrados:', actualFiltered);

    const missing = expectedFiltered.filter(h => !actualFiltered.includes(h));
    const extra = actualFiltered.filter(h => !expectedFiltered.includes(h));

    console.log('Faltantes:', missing);
    console.log('Extra:', extra);

    let outOfOrder = false;
    if (missing.length === 0 && extra.length === 0) {
      for (let i = 0; i < Math.max(expectedNorm.length, actualNorm.length); i++) {
        const exp = expectedNorm[i] || '';
        const act = actualNorm[i] || '';

        if (exp === '' && act === '') continue;

        if ((exp === '') !== (act === '')) {
          outOfOrder = true;
          break;
        }

        if (exp !== '' && act !== '' && exp !== act) {
          outOfOrder = true;
          break;
        }
      }
    }

    return {
      isValid: missing.length === 0 && extra.length === 0 && !outOfOrder,
      missing,
      extra,
      outOfOrder,
      expectedCount: expected.length,
      actualCount: actual.length
    };
  }

  private async validateTemplateHeaders(): Promise<boolean> {
    if (!this.workbook) return false;

    try {
      const selectedYear = this.form.get('year')?.value;
      const sheetsToValidate: { name: string, headers: string[] }[] = [];

      if (selectedYear === 'Seleccionar todo') {
        const processableSheets = this.getPreviewableSheets();
        for (const sheetName of processableSheets) {
          const { headers } = await this.readExcelSheet(sheetName);
          sheetsToValidate.push({ name: sheetName, headers });
        }
      } else {
        const targetSheetName = this.getSheetNameForYear(selectedYear);
        if (targetSheetName) {
          const { headers } = await this.readExcelSheet(targetSheetName);
          sheetsToValidate.push({ name: targetSheetName, headers });
        }
      }

      if (sheetsToValidate.length === 0) {
        throw new Error('No se encontraron hojas válidas para validar');
      }

      const validationErrors: Array<{
        sheetName: string,
        missing: string[],
        extra: string[],
        outOfOrder: boolean,
        expectedCount: number,
        actualCount: number
      }> = [];

      for (const sheet of sheetsToValidate) {
        let expectedHeaders: string[];

        console.log(`Validando hoja: ${sheet.name}`);
        console.log(`Encabezados encontrados: [${sheet.headers.join(', ')}]`);

        // Seleccionar encabezados esperados según el tipo de hoja
        if (sheet.name.toLowerCase() === 'autores') {
          expectedHeaders = [...this.EXPECTED_AUTHORS_HEADERS];
        } else {
          expectedHeaders = [...this.EXPECTED_YEAR_HEADERS];
        }

        console.log(`Encabezados esperados: [${expectedHeaders.join(', ')}]`);

        const comparison = this.compareHeaders(expectedHeaders, sheet.headers);

        if (!comparison.isValid) {
          validationErrors.push({
            sheetName: sheet.name,
            missing: comparison.missing,
            extra: comparison.extra,
            outOfOrder: comparison.outOfOrder,
            expectedCount: comparison.expectedCount,
            actualCount: comparison.actualCount
          });
        }
      }

      if (validationErrors.length > 0) {
        await this.showHeaderValidationError(validationErrors);
        return false;
      }

      return true;

    } catch (error) {
      console.error('Error en validación de encabezados:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'No se pudo validar la estructura del archivo contra la plantilla',
      });
      return false;
    }
  }

  private async showHeaderValidationError(errors: any[]): Promise<void> {
    const errorDetails = errors.map(error => {
      const missingHtml = error.missing.length > 0 ?
        `<li><strong class="text-danger">Faltan columnas:</strong> ${error.missing.join(', ')}</li>` : '';

      const extraHtml = error.extra.length > 0 ?
        `<li><strong class="text-warning">Columnas adicionales:</strong> ${error.extra.join(', ')}</li>` : '';

      const orderHtml = error.outOfOrder ?
        `<li><strong class="text-info">Orden incorrecto:</strong> Las columnas deben seguir el orden de la plantilla</li>` : '';

      const countHtml = `<li><strong>Columnas encontradas:</strong> ${error.actualCount} | <strong>Esperadas:</strong> ${error.expectedCount}</li>`;

      return `
        <div class="mb-3 p-3 border rounded">
          <h6 class="fw-bold text-primary">${this.escapeHtml(error.sheetName)}</h6>
          <ul class="mb-0 small">
            ${countHtml}
            ${missingHtml}
            ${extraHtml}
            ${orderHtml}
          </ul>
        </div>
      `;
    }).join('');

    await Swal.fire({
      icon: 'error',
      title: 'Encabezados no válidos',
      html: `
        <div class="text-start">
          <p class="mb-3">El archivo no coincide con la estructura de la plantilla INDAUTOR. Los encabezados deben estar en la <strong>fila 6</strong> y abarcar las <strong>columnas B hasta S</strong> (para años) o <strong>B hasta N</strong> (para AUTORES).</p>
          ${errorDetails}
          <div class="alert alert-info mt-3">
            <small>
              <i class="bi bi-info-circle me-1"></i>
              <strong>Recomendación:</strong> Descarga la plantilla oficial y copia tus datos manteniendo la estructura de encabezados.
            </small>
          </div>
        </div>
      `,
      width: '70%',
      confirmButtonText: 'Entendido',
      showCancelButton: true,
      cancelButtonText: 'Descargar plantilla',
      customClass: {
        htmlContainer: 'text-start'
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        this.downloadTemplate();
      }
    });
  }
}
