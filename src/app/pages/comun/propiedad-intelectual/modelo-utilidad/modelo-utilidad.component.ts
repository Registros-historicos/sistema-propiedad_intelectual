import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UtilityModelsService } from '../../../../api/services/utility-models.service';
import moment from 'moment';
import { switchMap } from 'rxjs';
import { IModUtilModel } from 'src/app/api/models/mod-util.model';
import { TranslateService } from '@ngx-translate/core';
import {
  ParametrizacionesService,
  Catalogos,
  Parametrizacion,
} from '../../../../api/services/parametrizaciones.service';

declare const $: any;

// 👉 Lo flexibilizamos a string para no perder selección si el catálogo no trae el nombre exacto
type EstatusModUtil = string;

interface IndInventor {
  curp: string;
  nombreCompleto: string;
  sexo: 'M' | 'F' | '';
  tipoInvestigador: string;
  institucion: string;
  programaEducativo: string;
  cuerpoAcademico: string;
  departamento: string;
  fechaAfiliacion: string; // YYYY-MM-DD
  fechaFin: string; // YYYY-MM-DD
}

type IndautorUIModel = {
  id: number;
  titulo: string;

  rama: string;
  medioIngreso: string;
  tipoSector: string;

  institucion: string;
  fechaSolicitud: string;
  numeroExpediente: string;

  estatus: EstatusModUtil | '';
  fechaExpedicion: string;
  archivo: string;
  observaciones: string;
  descripcion: string;
  inventores: IndInventor[];
};

@Component({
  selector: 'app-modelo-utilidad',
  templateUrl: './modelo-utilidad.component.html',
  styleUrl: './modelo-utilidad.component.scss',
})
export class ModeloUtilidadComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  pageLength = 10;
  dtInstance: any;
  lengthMenu: number[] = [5, 10, 15, 20];

  datatableConfig: Config = {} as Config;

  reloadEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};
  placeholder = '';

  // ====== Catálogos ======
  ramasCatalogo: Parametrizacion[] = [];          // tema 3
  mediosIngresoCatalogo: Parametrizacion[] = [];  // tema 8
  tiposSectorCatalogo: Parametrizacion[] = [];    // tema 2
  estatusCatalogo: Parametrizacion[] = [];        // tema 7

  // Base de opciones visibles
  estatusOptions: EstatusModUtil[] = [
    'Registrada',
    'En trámite',
    'Trámite con observaciones',
    'Aprobada',
    'Concluida',
  ];

  selectedRamaId: number | null = null;
  selectedMedioIngresoId: number | null = null;
  selectedTipoSectorId: number | null = null;

  private rawIdsForSave = {
    ramaId: '' as string | number | null,
    medioIngresoId: '' as string | number | null,
    tipoSectorId: '' as string | number | null,
    estatusId: '' as string | number | null,
  };

  indautorModel: IndautorUIModel = {
    id: 0,
    titulo: '',
    rama: '',
    medioIngreso: '',
    tipoSector: '',
    institucion: '',
    fechaSolicitud: '',
    numeroExpediente: '',
    estatus: 'En trámite',
    fechaExpedicion: '',
    archivo: '',
    observaciones: '',
    descripcion: '',
    inventores: [],
  };

  isViewMode = true;
  isSaving = false;

  private tableData: any[] = [];

  constructor(
    private service: UtilityModelsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private paramService: ParametrizacionesService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH');
    this.cargarCatalogos();

    this.datatableConfig = {
      serverSide: false,
      processing: true,
      searching: true,
      deferRender: true,
      ordering: true,
      orderMulti: true,
      order: [[0, 'asc']],
      rowId: 'id',
      columnDefs: [{ targets: -1, orderable: false }],
      lengthMenu: this.lengthMenu,
      pageLength: this.pageLength,
      language: {
        info: this.translate.instant('TABLE.PAG_INFO'),
        infoFiltered: this.translate.instant('TABLE.PAG_INFO_FILTERED'),
        processing: this.translate.instant('TABLE.PROCESSING'),
        emptyTable: this.translate.instant('TABLE.EMPTY_TABLE'),
        infoEmpty: this.translate.instant('TABLE.PAG_INFO_EMPTY'),
        zeroRecords: this.translate.instant('TABLE.ZERO_RECORDS'),
      },
      data: [],
      columns: [
        { title: 'ID', data: 'id', className: 'text-gray-700 fw-semibold',
          render: (d: any, t: string) => t !== 'display' ? d ?? '' : `<span class="fw-semibold">${d ?? ''}</span>` },
        {
          title: 'N.º DE EXPEDIENTE',
          data: 'solicitudId',
          render: (data: any, type: string) => {
            if (type !== 'display') return data ?? '';
            const val = (data ?? '') !== '' ? String(data) : '—';
            return `<span class="fw-semibold text-gray-600"
                    style="display:inline-block;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${val}</span>`;
          },
        },
        {
          title: this.translate.instant('TABLE.BRANCH') || 'RAMA',
          data: 'ramaLabel',
          render: (data: any, type: string, full: any) => {
            const label = (data ?? full?.rama ?? '—').toString();
            if (type !== 'display') return label;
            const id = full?.id ?? '';
            const initials = label && label.length > 1 ? (label[0] + (label[1] || '')).toUpperCase() : 'IN';
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
            return `
              <div class="d-flex align-items-center">
                <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${id}">
                  <a href="javascript:;">
                    <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                      ${initials}
                    </div>
                  </a>
                </div>
                <div class="d-flex flex-column" data-action="view" data-id="${id}">
                  <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${label}</a>
                </div>
              </div>`;
          },
        },
        {
          title: this.translate.instant('TABLE.WORK_TITLE') || 'TÍTULO',
          data: 'nombreModUtil',
          render: (data: string, type: string) =>
            type !== 'display' ? data || '' : `<span class="fw-bold fs-6 text-gray-800">${data || ''}</span>`,
        },
        {
          title: this.translate.instant('TABLE.INSTITUTION') || 'INSTITUCIÓN',
          data: 'institucion',
          render: (data: string, type: string) =>
            type !== 'display' ? data || '' : `<span class="fw-semibold text-gray-600">${data || '—'}</span>`,
        },
        {
          title: this.translate.instant('TABLE.DATE') || 'FECHA DE SOLICITUD',
          data: 'fechaSolicitud',
          render: (data: string, type: string) =>
            type !== 'display' ? data || '' : `<span class="fw-semibold text-gray-600">${data ? moment(data).format('DD-MM-YYYY') : ''}</span>`,
        },
      ],
      createdRow: (row: any, data: any) => {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.attr('data-id', data?.id ?? 0);
        $row.addClass('cursor-pointer');
      },
      initComplete: (settings: any) => {
        this.dtInstance = settings.oInstance.api();
        this.refreshTableData();
        this.cdr.detectChanges();
      },
    } as Config;
  }

  private cargarCatalogos(): void {
    this.paramService.getAll().subscribe({
      next: (cats: Catalogos) => {
        this.ramasCatalogo = (cats[3]?.lista || []) as Parametrizacion[];
        this.mediosIngresoCatalogo = (cats[8]?.lista || []) as Parametrizacion[];
        this.tiposSectorCatalogo = (cats[2]?.lista || []) as Parametrizacion[];
        this.estatusCatalogo = (cats[7]?.lista || []) as Parametrizacion[];

        // Si vienen nombres en tema 7, usamos los que coinciden con los 5 principales, manteniendo orden
        const fromCat = (this.estatusCatalogo || []).map(e => e?.nombre).filter(Boolean) as string[];
        const orden: EstatusModUtil[] = [
          'Registrada','En trámite','Trámite con observaciones','Aprobada','Concluida'
        ];
        if (fromCat.length) {
          this.estatusOptions = orden.filter(n => fromCat.includes(n));
          // Si el catálogo no trae alguno, conserva el resto para no perder selección previa
          if (!this.estatusOptions.length) this.estatusOptions = orden;
        }
      },
      error: (e) => console.error('❌ Error cargando catálogos', e),
    });
  }

  private refreshTableData(): void {
    this.service.getModUtiles({ start: 0, length: 100000 }).subscribe({
      next: (res) => {
        const rows = (res?.data || []).map((r: any) => ({
          id: r.id,
          solicitudId: r.solicitudId,
          ramaLabel: r.ramaLabel ?? r.rama ?? '',
          nombreModUtil: r.nombreModUtil,
          institucion: r.institucion,
          fechaSolicitud: r.fechaSolicitud,
        }));

        this.tableData = rows;

        if (this.dtInstance) {
          this.dtInstance.clear();
          this.dtInstance.rows.add(this.tableData);
          this.dtInstance.draw(false);
        } else {
          this.datatableConfig.data = this.tableData;
        }
      },
      error: () => {
        this.tableData = [];
        if (this.dtInstance) {
          this.dtInstance.clear().draw(false);
        } else {
          this.datatableConfig.data = [];
        }
      },
    });
  }

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value, 10);
    this.pageLength = newLength;
    if (this.dtInstance) this.dtInstance.page.len(newLength).draw();
    else this.reloadEvent.emit(true);
  }

  // ===== Helpers =====
  private asId(v: any): string | number | null {
    if (v === null || v === undefined) return null;
    if (typeof v === 'object') {
      if ('id_param' in v) return (v.id_param as number) ?? null;
      if ('id' in v) return (v.id as number) ?? null;
      return null;
    }
    return v as string | number;
  }
  private asName(v: any, alt?: string, fallback: string = ''): string {
    if (v && typeof v === 'object' && 'nombre' in v) return v.nombre as string;
    return (alt ?? fallback) || '';
  }
  private findIdByName(catalog: Parametrizacion[], nombre: string): number | null {
    if (!nombre) return null;
    const found = catalog.find(
      (x) => x?.nombre?.toLowerCase().trim() === String(nombre).toLowerCase().trim()
    );
    return found?.id_param ?? null;
  }
  private s(v: any): string {
    return v === undefined || v === null ? '' : String(v);
  }
  private sid(v: any): string {
    if (v === undefined || v === null || v === '') return '';
    return String(v);
  }

  private ensureEstatusOption(name: string) {
    if (!name) return;
    if (!this.estatusOptions.includes(name)) {
      // lo agregamos para que el select quede preseleccionado como antes
      this.estatusOptions = [...this.estatusOptions, name];
    }
  }

  private resolveEstatusNombre(extra: any, current: any): EstatusModUtil | '' {
    const fromObj =
      extra?.estatus_param &&
      typeof extra.estatus_param === 'object' &&
      'nombre' in extra.estatus_param
        ? (extra.estatus_param.nombre as string)
        : '';

    let fromId = '';
    const maybeId = this.asId(extra?.estatus_param);
    if (typeof maybeId === 'number') {
      const match = this.estatusCatalogo.find((x) => x.id_param === maybeId);
      fromId = match?.nombre || '';
    }

    const name = (current as string) || fromObj || fromId || '';
    // No forzamos a los 5; permitimos cualquier string para preservar selección previa
    return (name || 'En trámite') as EstatusModUtil;
  }

  // ===== Modales =====
  view(id: number): void {
    this.isViewMode = true;
    this.cdr.detectChanges();

    this.service.getModUtil(id).subscribe({
      next: (modUtil: IModUtilModel) => {
        const extra: any = modUtil as any;

        const ramaTxt   = (modUtil as any).rama ?? this.asName(extra.rama_param) ?? '';
        const medioTxt  = (modUtil as any).medioIngreso ?? this.asName(extra.medio_ingreso_param) ?? '';
        const sectorTxt = (modUtil as any).tipoSector ?? this.asName(extra.tipo_sector_param) ?? '';
        const estatusNombre = this.resolveEstatusNombre(extra, (modUtil as any).estatus);

        // Asegura que el estatus actual esté en las opciones (preselección igual que antes)
        this.ensureEstatusOption(estatusNombre);

        this.rawIdsForSave = {
          ramaId: this.asId(extra.rama_param),
          medioIngresoId: this.asId(extra.medio_ingreso_param),
          tipoSectorId: this.asId(extra.tipo_sector_param),
          estatusId: this.asId(extra.estatus_param),
        };

        this.selectedRamaId =
          (this.rawIdsForSave.ramaId as number) ?? this.findIdByName(this.ramasCatalogo, ramaTxt);
        this.selectedMedioIngresoId =
          (this.rawIdsForSave.medioIngresoId as number) ?? this.findIdByName(this.mediosIngresoCatalogo, medioTxt);
        this.selectedTipoSectorId =
          (this.rawIdsForSave.tipoSectorId as number) ?? this.findIdByName(this.tiposSectorCatalogo, sectorTxt);

        this.indautorModel = {
          id: modUtil.id,
          titulo: (modUtil as any).nombreModUtil || '',
          rama: ramaTxt,
          medioIngreso: medioTxt,
          tipoSector: sectorTxt,
          institucion: modUtil.institucion || '',
          fechaSolicitud: (modUtil as any).fechaSolicitud || '',
          numeroExpediente: (modUtil as any).solicitudId || '',
          estatus: estatusNombre,
          fechaExpedicion: (extra?.fechaExpedicion as string) || '',
          archivo: (Array.isArray(modUtil.documentos) && modUtil.documentos[0]) || '',
          observaciones: (modUtil as any).observaciones || '',
          descripcion: (modUtil as any).descripcion || '',
          inventores: [],
        };
      },
      error: () => {
        this.showAlert({ icon: 'error', title: 'Error', text: 'No se pudo cargar el detalle.' });
      },
    });
  }

  edit(id: number): void {
    this.isViewMode = false;
    this.cdr.detectChanges();

    this.service.getModUtil(id).subscribe({
      next: (modUtil: IModUtilModel) => {
        const extra: any = modUtil as any;

        const ramaTxt   = (modUtil as any).rama ?? this.asName(extra.rama_param) ?? '';
        const medioTxt  = (modUtil as any).medioIngreso ?? this.asName(extra.medio_ingreso_param) ?? '';
        const sectorTxt = (modUtil as any).tipoSector ?? this.asName(extra.tipo_sector_param) ?? '';
        const estatusNombre = this.resolveEstatusNombre(extra, (modUtil as any).estatus);

        // Asegura que el estatus actual esté en las opciones (preselección igual que antes)
        this.ensureEstatusOption(estatusNombre);

        this.rawIdsForSave = {
          ramaId: this.asId(extra.rama_param),
          medioIngresoId: this.asId(extra.medio_ingreso_param),
          tipoSectorId: this.asId(extra.tipo_sector_param),
          estatusId: this.asId(extra.estatus_param),
        };

        this.selectedRamaId =
          (this.rawIdsForSave.ramaId as number) ?? this.findIdByName(this.ramasCatalogo, ramaTxt);
        this.selectedMedioIngresoId =
          (this.rawIdsForSave.medioIngresoId as number) ?? this.findIdByName(this.mediosIngresoCatalogo, medioTxt);
        this.selectedTipoSectorId =
          (this.rawIdsForSave.tipoSectorId as number) ?? this.findIdByName(this.tiposSectorCatalogo, sectorTxt);

        this.indautorModel = {
          id: modUtil.id,
          titulo: (modUtil as any).nombreModUtil || '',
          rama: ramaTxt,
          medioIngreso: medioTxt,
          tipoSector: sectorTxt,
          institucion: modUtil.institucion || '',
          fechaSolicitud: (modUtil as any).fechaSolicitud || '',
          numeroExpediente: (modUtil as any).solicitudId || '',
          estatus: estatusNombre, // ← sigue preseleccionado
          fechaExpedicion: (extra?.fechaExpedicion as string) || '',
          archivo: (Array.isArray(modUtil.documentos) && modUtil.documentos[0]) || '',
          observaciones: (modUtil as any).observaciones || '',
          descripcion: (modUtil as any).descripcion || '',
          inventores: [],
        };
      },
      error: () => {
        this.showAlert({ icon: 'error', title: 'Error', text: 'No se pudo cargar el detalle para edición.' });
      },
    });
  }

  saveEdit(modal: any): void {
    if (!this.indautorModel.titulo?.trim()) {
      this.showAlert({ icon: 'error', title: 'Validación', text: 'El título es obligatorio.' });
      return;
    }

    const id = this.indautorModel.id;
    this.isSaving = true;

    const ramaId =
      this.selectedRamaId ??
      (typeof this.rawIdsForSave.ramaId === 'number'
        ? this.rawIdsForSave.ramaId
        : this.findIdByName(this.ramasCatalogo, this.indautorModel.rama));

    const medioId =
      this.selectedMedioIngresoId ??
      (typeof this.rawIdsForSave.medioIngresoId === 'number'
        ? this.rawIdsForSave.medioIngresoId
        : this.findIdByName(this.mediosIngresoCatalogo, this.indautorModel.medioIngreso));

    const sectorId =
      this.selectedTipoSectorId ??
      (typeof this.rawIdsForSave.tipoSectorId === 'number'
        ? this.rawIdsForSave.tipoSectorId
        : this.findIdByName(this.tiposSectorCatalogo, this.indautorModel.tipoSector));

    // nombre → id (tema 7). Si no existe, cae al id crudo detectado.
    const estatusIdByName = this.findIdByName(this.estatusCatalogo, this.indautorModel.estatus as string);
    const estatusId =
      estatusIdByName ??
      (typeof this.rawIdsForSave.estatusId === 'number' ? this.rawIdsForSave.estatusId : null);

    this.service
      .getRegistroRaw(id)
      .pipe(
        switchMap((raw) => {
          const dto = {
            no_expediente: this.s(this.indautorModel.numeroExpediente || raw.no_expediente),
            titulo: this.s(this.indautorModel.titulo || raw.titulo),
            tipo_ingreso_param: this.sid(raw.tipo_ingreso_param ?? '45'),
            id_usuario: Number((raw as any).id_usuario ?? 0),
            rama_param: this.sid(ramaId ?? raw.rama_param),
            fec_expedicion: this.s(this.indautorModel.fechaExpedicion || (raw as any).fec_expedicion || ''),
            observaciones: this.s(this.indautorModel.observaciones ?? raw.observaciones),
            archivo: this.s(this.indautorModel.archivo ?? raw.archivo),
            estatus_param: this.sid(estatusId ?? raw.estatus_param),
            medio_ingreso_param: this.sid(medioId ?? raw.medio_ingreso_param),
            tipo_registro_param: this.sid(raw.tipo_registro_param ?? '45'),
            fec_solicitud: this.s(this.indautorModel.fechaSolicitud ?? raw.fec_solicitud),
            descripcion: this.s(this.indautorModel.descripcion ?? raw.descripcion),
            tipo_sector_param: this.sid(sectorId ?? raw.tipo_sector_param),
          };

          return this.service.updateRegistro(id, dto as any);
        })
      )
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.isViewMode = true;

          this.patchRowInTable(id, {
            solicitudId: this.indautorModel.numeroExpediente,
            nombreModUtil: this.indautorModel.titulo,
            institucion: this.indautorModel.institucion,
            fechaSolicitud: this.indautorModel.fechaSolicitud,
            ramaLabel: this.getNombreDeCatalogo(this.ramasCatalogo, this.selectedRamaId) || this.indautorModel.rama,
          });

          this.showAlert({
            icon: 'success',
            title: '¡Guardado!',
            text: 'Los cambios se guardaron correctamente.',
            timer: 1800,
            showConfirmButton: false,
          });

          this.refreshTableData();
          modal?.dismiss?.('saved');
        },
        error: (err) => {
          this.isSaving = false;
          this.showAlert({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Revisa que los *_param se envíen como strings (IDs) y que id_usuario sea numérico.',
          });
          console.error('PUT /api/registros/{id}/ error:', err);
        },
      });
  }

  private getNombreDeCatalogo(cat: Parametrizacion[], id?: number | null): string {
    if (!id) return '';
    const r = cat.find((x) => x.id_param === id);
    return r?.nombre ?? '';
  }

  private patchRowInTable(id: number, patch: Partial<any>): void {
    if (!this.dtInstance) return;

    const i = this.tableData.findIndex((x) => Number(x.id) === Number(id));
    if (i > -1) this.tableData[i] = { ...this.tableData[i], ...patch };

    let row = this.dtInstance.row(`#${id}`);
    if (!row || !row.data || !row.data()) {
      row = this.dtInstance.row((idx: number, data: any) => Number(data?.id) === Number(id));
    }
    if (row && row.data) {
      const current = row.data();
      const merged = { ...current, ...patch };
      if (patch.ramaLabel === undefined && current?.ramaLabel) {
        merged.ramaLabel = current.ramaLabel;
      }
      row.data(merged).draw(false);
    }
  }

  delete(id: number): void {
    this.service.deleteModUtil(id).subscribe({
      next: () => {
        if (this.dtInstance) {
          this.dtInstance
            .rows((idx: number, data: any) => Number(data?.id) === Number(id))
            .remove()
            .draw(false);
        }
        this.showAlert({ icon: 'success', title: 'Deshabilitado', text: 'El registro fue deshabilitado.' });
      },
      error: () => {
        this.showAlert({ icon: 'error', title: 'Error', text: 'No se pudo deshabilitar el registro.' });
      },
    });
  }

  addInventor(): void {
    if (!this.indautorModel.inventores) this.indautorModel.inventores = [];
    this.indautorModel.inventores.push({
      curp: 'LOPR920202MDFRRS02',
      nombreCompleto: 'Lourdes Pérez Ríos',
      sexo: 'F',
      tipoInvestigador: 'Técnico Académico',
      institucion: 'Instituto Tecnológico Orizaba',
      programaEducativo: 'Ingeniería Informática',
      cuerpoAcademico: 'CA de Informática y Computación',
      departamento: 'Sistemas Computacionales',
      fechaAfiliacion: '2025-09-12',
      fechaFin: '2027-06-23',
    });
  }

  get inventoresVisibles(): IndInventor[] {
    const invs = this.indautorModel.inventores || [];
    return invs.filter((i) => !!(i && (i.curp || i.nombreCompleto || i.institucion)));
  }

  downloadDocument(documentName: string): void {
    console.log('Descargando documento:', documentName);
  }

  closeForm(modal: any): void {
    modal.dismiss('cancel');
    this.isViewMode = true;

    this.indautorModel = {
      id: 0,
      titulo: '',
      rama: '',
      medioIngreso: '',
      tipoSector: '',
      institucion: '',
      fechaSolicitud: '',
      numeroExpediente: '',
      estatus: 'En trámite',
      fechaExpedicion: '',
      archivo: '',
      observaciones: '',
      descripcion: '',
      inventores: [],
    };

    this.rawIdsForSave = { ramaId: null, medioIngresoId: null, tipoSectorId: null, estatusId: null };
    this.selectedRamaId = null;
    this.selectedMedioIngresoId = null;
    this.selectedTipoSectorId = null;
  }

  showAlert(swalOptions: SweetAlertOptions): void {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') style = 'danger';

    this.swalOptions = Object.assign(
      {
        buttonsStyling: false,
        confirmButtonText: 'Ok, entendido!',
        customClass: { confirmButton: 'btn btn-' + style },
      },
      swalOptions
    );
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }
}
