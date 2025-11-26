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
import { CargaMasivaService } from 'src/app/api/services/carga-masiva.service';

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

  // ----------------------------------------------------------------------
  // 1. CONFIGURACIÓN ESPECÍFICA DE INDAUTOR (Diferente a IMPI)
  // ----------------------------------------------------------------------
  
  private readonly EXCLUDED_SHEETS = [
    'INSTRUCTIVO',
    'PRIMARIO',
    'SECUNDARIO',
    'TERCIARIO',
    'CUATERNARIO',
    'QUINARIO',
    'CLASIFICACIONES'
  ];

  // Encabezados correctos para INDAUTOR
private readonly EXPECTED_YEAR_HEADERS = [
  'N. Expediente(1)',          // B6
  'Título (2)',                 // C6
  'Descripción (3)',            // D6
  'Fecha de Solicitud (4)',     // E6
  'N. de Certificado (5)',      // F6
  'Estatus (6)',                // G6
  'Rama (7)',                   // H6
  'Medio de Ingreso (8)',       // I6
  'Tecnológico de Origen (9)',  // J6
  'Año Renovación (10)',        // K6
  'Tipo de Sector (11)',        // L6
  'Sector (12)',                // M6
  'Subsector (13)',             // N6
  'Autores (14)',               // O6
  'Fecha de Expedición (15)',   // P6
  'Archivo (16)',               // Q6
  'Observaciones (17)'          // R6
];

private readonly EXPECTED_AUTHORS_HEADERS = [
  'CURP (18)',                   // B6
  'Nombres (19)',                // C6
  'Apellido Paterno (20)',       // D6
  'Apellido Materno (21)',       // E6
  'Sexo (22)',                   // F6
  'Tipo de Investigador (23)',   // G6
  'Institución (24)',            // H6
  'Programa Educativo (25)',     // I6
  'Cuerpo Académico (26)',       // J6
  'Departamento (27)',           // K6
  'Fecha de Afiliación (28)',    // L6
  'Fecha de Fin (29)',           // M6
  'Observaciones (30)'           // N6
];
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private cargaMasivaService: CargaMasivaService
  ) {
    this.backRoute = this.navigationService.getHistoricalRecordsRoute();

    // Rango: 2022 - Año actual
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let y = 2022; y <= currentYear; y++) {
      this.years.push(y);
    }

    this.form = this.fb.group({
      year: [[]],  // Inicializado como Array vacío
      file: [null, [Validators.required, this.excelFileValidator]],
    });
  }

  // ----------------------------------------------------------------------
  // 2. LÓGICA DE DROPDOWN CHECKLIST (Igual a la de IMPI que funciona)
  // ----------------------------------------------------------------------
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onToggleYear(option: any) {
    const control = this.form.get('year');
    let selected = control?.value || [];
    
    // Asegurar que sea array
    if (!Array.isArray(selected)) selected = [];

    // Caso: Seleccionar todo
    if (option === 'Seleccionar todo') {
      if (selected.length === this.years.length) {
        control?.setValue([]); // Desmarcar todo
      } else {
        control?.setValue([...this.years]); // Marcar todo
      }
      return;
    }

    // Caso: Años individuales
    if (selected.includes(option)) {
      selected = selected.filter((x: any) => x !== option);
    } else {
      selected.push(option);
    }

    control?.setValue(selected);
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
        await this.preloadAllSheets();

        // 3. Resetear el dropdown al cargar archivo nuevo
        this.form.patchValue({ year: [] }); 

        const detectedSheets = this.getPreviewableSheets();
        Swal.fire({
          icon: 'info',
          title: 'Hojas detectadas',
          html: `
            <div class="text-start">
              <p>Se detectaron las siguientes hojas válidas:</p>
              <ul>${detectedSheets.map(s => `<li><strong>${s}</strong></li>`).join('')}</ul>
            </div>
          `,
          confirmButtonText: 'Continuar',
        });

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
    if (!this.file) return;
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
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(this.file!);
    });
  }

  async preloadAllSheets(): Promise<void> {
    if (!this.workbook) return;
    for (const sheetName of this.availableSheets) {
      try {
        const { headers, data } = await this.readExcelSheet(sheetName);
        this.sheetDataCache.set(sheetName, { headers, data });
      } catch {}
    }
  }

  async readExcelSheet(sheetName?: string): Promise<{ headers: string[], data: any[], sheetName: string }> {
    if (!this.workbook) return { headers: [], data: [], sheetName: '' };

    try {
      let targetSheetName = sheetName || this.workbook.SheetNames[0];

      if (this.sheetDataCache.has(targetSheetName)) {
        const cached = this.sheetDataCache.get(targetSheetName)!;
        return { ...cached, sheetName: targetSheetName };
      }

      const sheet = this.workbook.Sheets[targetSheetName];
      if (!sheet) throw new Error(`La hoja "${targetSheetName}" no existe`);

      // 4. INDAUTOR: Generalmente TODO está en la fila 6 (índice 5)
      // A diferencia de IMPI que tenía Autores en fila 4.
      const headerRow = 5; 

      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: '',
        blankrows: false,
        range: headerRow
      });

      if (jsonData.length === 0) {
        return { headers: [], data: [], sheetName: targetSheetName };
      }
      const headers = (jsonData[0] as any[])
        .map(h => (h !== undefined && h !== null ? String(h).trim() : ''))
        .filter(h => h !== '');

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
    return this.availableSheets.filter(sheet => {
      const upper = sheet.toUpperCase().trim();
      const isExcluded = this.EXCLUDED_SHEETS.includes(upper);
      const isAuthorsSheet = upper === 'AUTORES';
      const isYearSheet = /^[0-9]{4}$/.test(sheet.trim());
      return !isExcluded && (isYearSheet || isAuthorsSheet);
    });
  }

  async previewExcel() {
    if (!this.workbook) return;

    try {
      const previewableSheets = this.getPreviewableSheets();
      if (previewableSheets.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Sin datos', text: 'No se encontraron hojas válidas' });
        return;
      }

      const previewData: any[] = [];
      for (const sheetName of previewableSheets) {
        try {
          const { headers, data } = await this.readExcelSheet(sheetName);
          previewData.push({
            sheetName,
            headers,
            data: data.slice(0, 10),
            totalRows: data.length,
            isExcluded: false
          });
        } catch {}
      }

      const excludedSheets = this.availableSheets.filter(s => this.EXCLUDED_SHEETS.includes(s.toUpperCase()));
      this.showPreviewModal(previewData, excludedSheets);

    } catch (error) {
      console.error('Error en vista previa:', error);
    }
  }

  private showPreviewModal(previewData: any[], excludedSheets: string[]) {
    const createTableHtml = (item: any) => {
      if (item.headers.length === 0) return '<div class="alert alert-warning">Sin datos disponibles</div>';
      const headerRow = item.headers.map((h: string) => `<th class="px-2 py-1 bg-light border text-start small">${this.escapeHtml(h)}</th>`).join('');
      const dataRows = item.data.map((row: any[]) => {
        const cells = row.map((cell: any) => {
          const cellValue = cell !== null ? String(cell) : '';
          const displayValue = cellValue.length > 30 ? cellValue.substring(0, 30) + '...' : cellValue;
          return `<td class="px-2 py-1 border text-start small">${this.escapeHtml(displayValue)}</td>`;
        }).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<div class="table-responsive mb-3"><table class="table table-sm table-bordered"><thead><tr>${headerRow}</tr></thead><tbody>${dataRows}</tbody></table></div>`;
    };

    const tabsHtml = previewData.map((item, index) =>
      `<li class="nav-item"><button class="nav-link ${index === 0 ? 'active' : ''}" type="button" data-tab-index="${index}">${this.escapeHtml(item.sheetName)} (${item.totalRows})</button></li>`
    ).join('');

    const contentHtml = previewData.map((item, index) =>
      `<div class="tab-pane ${index === 0 ? 'show active' : ''}" id="tab-${index}"><h6 class="mb-3">Hoja: ${this.escapeHtml(item.sheetName)}</h6>${createTableHtml(item)}</div>`
    ).join('');

    Swal.fire({
      title: `Vista previa: ${this.fileName}`,
      html: `<div class="text-start"><ul class="nav nav-tabs mb-3" id="preview-tabs">${tabsHtml}</ul><div class="tab-content" id="preview-tab-content">${contentHtml}</div></div>`,
      width: '90%',
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const tabButtons = document.querySelectorAll('#preview-tabs button[data-tab-index]');
        const tabPanes = document.querySelectorAll('#preview-tab-content .tab-pane');
        tabButtons.forEach((tabButton) => {
          tabButton.addEventListener('click', (e) => {
            e.preventDefault();
            const idx = (e.target as HTMLButtonElement).getAttribute('data-tab-index');
            if (idx !== null) {
              tabButtons.forEach(btn => btn.classList.remove('active'));
              tabPanes.forEach(pane => pane.classList.remove('show', 'active'));
              (e.target as HTMLElement).classList.add('active');
              document.querySelector(`#tab-${idx}`)?.classList.add('show', 'active');
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

  downloadTemplate() {
    this.cargaMasivaService.descargarPlantilla('indautor').subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Plantilla_INDAUTOR.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo descargar la plantilla INDAUTOR' });
      },
    });
  }

  getSheetNameForYear(year: number | string): string | null {
    const yearStr = year.toString();
    return this.availableSheets.find(name => name.trim() === yearStr && /^[0-9]{4}$/.test(name.trim())) || null;
  }

  async submit() {
    if (this.form.invalid || !this.file) {
      Swal.fire({ icon: 'warning', title: 'Formulario incompleto', text: 'Selecciona años y archivo' });
      return;
    }

    const selectedYear = this.form.get('year')?.value;

    if (!this.workbook) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se ha cargado el archivo Excel' });
      return;
    }

    this.isUploading = true;
    Swal.fire({ title: 'Subiendo archivo...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const isTemplateValid = await this.validateTemplateHeaders();
      if (!isTemplateValid) {
        this.isUploading = false;
        Swal.close();
        return;
      }

      let targetSheets: string[] = [];

      // 5. MANEJO DE ARRAY DE AÑOS PARA INDAUTOR
      if (Array.isArray(selectedYear)) {
        targetSheets = selectedYear
          .map((y: number | string) => this.getSheetNameForYear(y))
          .filter((s: string | null): s is string => s !== null);
      } else {
        // Fallback por si acaso
        const single = this.getSheetNameForYear(selectedYear);
        if (single) targetSheets.push(single);
      }

      // Siempre incluir AUTORES si existe
      if (this.availableSheets.includes('AUTORES')) {
        targetSheets.push('AUTORES');
      }

      const hojasSeleccionadas = targetSheets.join(',');
      
      const response = await this.cargaMasivaService
        .uploadExcel('indautor', this.file!, hojasSeleccionadas)
        .toPromise();

      Swal.close();

      Swal.fire({
        icon: 'success',
        title: '¡Carga completada!',
        html: `<p><strong>Hojas enviadas:</strong> ${targetSheets.join(', ')}</p><br><small>${response?.mensaje || ''}</small>`,
        confirmButtonColor: '#28a745',
      }).then(() => {
        this.resetForm();
      });

    } catch (error: any) {
      Swal.close();
      Swal.fire({ icon: 'error', title: 'Error', text: error?.message || 'Error al subir.' });
    } finally {
      this.isUploading = false;
    }
  }

  resetForm() {
    this.form.reset({ year: [], file: null });
    this.file = null;
    this.fileName = null;
    this.workbook = null;
    this.sheetDataCache.clear();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  cancel() {
    this.resetForm();
  }

  private normalizeHeader(header: string): string {
    return header
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  private compareHeaders(expected: string[], actual: string[]) {
    const normalizeArray = (arr: string[]) => arr.map(h => this.normalizeHeader(h));
    const expectedNorm = normalizeArray(expected);
    const actualNorm = normalizeArray(actual);

    const expectedFiltered = expectedNorm.filter(h => h !== '');
    const actualFiltered = actualNorm.filter(h => h !== '');

    const missing = expectedFiltered.filter(h => !actualFiltered.includes(h));
    const extra = actualFiltered.filter(h => !expectedFiltered.includes(h));
    let outOfOrder = false;

    if (missing.length === 0 && extra.length === 0) {
      for (let i = 0; i < Math.max(expectedNorm.length, actualNorm.length); i++) {
         if ((expectedNorm[i] || '') !== (actualNorm[i] || '')) {
            outOfOrder = true; break;
         }
      }
    }
    return { isValid: missing.length === 0 && extra.length === 0 && !outOfOrder, missing, extra, outOfOrder, expectedCount: expected.length, actualCount: actual.length };
  }

  private async validateTemplateHeaders(): Promise<boolean> {
    if (!this.workbook) return false;

    try {
      const selectedYear = this.form.get('year')?.value;
      const sheetsToValidate: { name: string, headers: string[] }[] = [];
      let targetSheets: string[] = [];

      if (Array.isArray(selectedYear)) {
        targetSheets = selectedYear
          .map((y: number | string) => this.getSheetNameForYear(y))
          .filter((s: string | null): s is string => s !== null);
      } else {
        const single = this.getSheetNameForYear(selectedYear);
        if (single) targetSheets.push(single);
      }

      const autoresSheet = this.availableSheets.find(s => s.toUpperCase() === 'AUTORES');
      if (autoresSheet && !targetSheets.includes(autoresSheet)) {
        targetSheets.push(autoresSheet);
      }

      if (targetSheets.length === 0) throw new Error('No se encontraron hojas válidas');

      for (const sheetName of targetSheets) {
        const { headers } = await this.readExcelSheet(sheetName);
        sheetsToValidate.push({ name: sheetName, headers });
      }

      const validationErrors: any[] = [];

      for (const sheet of sheetsToValidate) {
        let expectedHeaders: string[];
        
        // 6. VALIDAR CONTRA LOS HEADERS DE INDAUTOR
        if (sheet.name.toUpperCase() === 'AUTORES') {
          expectedHeaders = [...this.EXPECTED_AUTHORS_HEADERS];
        } else {
          expectedHeaders = [...this.EXPECTED_YEAR_HEADERS];
        }

        const comparison = this.compareHeaders(expectedHeaders, sheet.headers);

        if (!comparison.isValid) {
          validationErrors.push({ sheetName: sheet.name, ...comparison });
        }
      }

      if (validationErrors.length > 0) {
        await this.showHeaderValidationError(validationErrors);
        return false;
      }
      return true;

    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Error validación', text: 'Error al validar estructura.' });
      return false;
    }
  }

  private async showHeaderValidationError(errors: any[]): Promise<void> {
    const errorDetails = errors.map(error => 
      `<div class="mb-3 p-3 border rounded"><h6 class="fw-bold text-primary">${this.escapeHtml(error.sheetName)}</h6><ul>
      ${error.missing.length > 0 ? `<li><strong class="text-danger">Faltan:</strong> ${error.missing.join(', ')}</li>` : ''}
      ${error.extra.length > 0 ? `<li><strong class="text-warning">Sobran:</strong> ${error.extra.join(', ')}</li>` : ''}
      ${error.outOfOrder ? `<li><strong class="text-info">Orden incorrecto</strong></li>` : ''}
      </ul></div>`
    ).join('');

    await Swal.fire({
      icon: 'error',
      title: 'Encabezados inválidos (INDAUTOR)',
      html: `<div class="text-start"><p>La estructura no coincide con la plantilla INDAUTOR.</p>${errorDetails}</div>`,
      width: '70%',
      confirmButtonText: 'Entendido',
    });
  }
}