import { Injectable } from '@angular/core';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { IModUtilModel } from '../models/mod-util.model';
import { ApiCrudService } from '../ApiCrud.service';
import { ParametrizacionesService, Catalogos } from './parametrizaciones.service';

// ===== Tipos de la API (listado/detalle) =====
export type ApiItem = {
  id_registro: number;
  no_expediente: number | string;
  titulo: string;

  // Pueden venir como number/string u objeto cuando se convierten
  tipo_ingreso_param?: number | string | any;
  rama_param?: number | string | any;
  estatus_param?: number | string | any;
  medio_ingreso_param?: number | string | any;
  tipo_registro_param?: number | string | any;
  tipo_sector_param?: number | string | any;
  sector_param?: number | string | any;
  subsector_param?: number | string | any;

  // Campos alternativos / “amigables”
  rama?: number | string;
  medio_ingreso?: string;
  tipo_sector?: string;
  estatus?: string;

  id_usuario?: number;
  fec_expedicion?: string | null;
  observaciones?: string | null;
  archivo?: string | null;
  fec_solicitud?: string | null;
  descripcion?: string | null;

  // Institución puede venir como string o (tras conversión) objeto
  institucion?: string | any;
};

type ApiListResponse = {
  total: number | string;   // puede venir como "(...,63)"
  page: number;
  limit: number;
  results: ApiItem[];
};

// DTO EXACTO que pide tu backend en PUT /api/registros/{id}/
export interface UpdateRegistroDto {
  no_expediente: string;
  titulo: string;
  tipo_ingreso_param: string;
  id_usuario: number;
  rama_param: string;
  fec_expedicion: string;
  observaciones: string;
  archivo: string;
  estatus_param: string;
  medio_ingreso_param: string;
  tipo_registro_param: string;
  fec_solicitud: string;
  descripcion: string;
  tipo_sector_param: string;
  sector_param?: string;
  subsector_param?: string;
  // institucion (si tu backend espera id/param aquí, agregarlo)
}

@Injectable({ providedIn: 'root' })
export class UtilityModelsService {
  private readonly listBase = '/api/registros';
  private readonly searchBase = '/api/registros/search/';
  private readonly tipoIndautor = '45'; // INDAUTOR
  private catalogos?: Catalogos;

  constructor(
    private api: ApiCrudService,
    private paramService: ParametrizacionesService
  ) {}

  // ===== Helpers =====
  /** Traduce params de DataTables → { page, limit, search } */
  private dtToQuery(tableParams: any): { page: number; limit: number; search?: string } {
    const start = tableParams?.start ?? 0;
    const limit = tableParams?.length ?? 10;
    const page = Math.floor(start / limit) + 1;
    const search = tableParams?.search?.value?.trim();
    return { page, limit, search };
  }

  /** Extrae entero de un total que puede venir como número o string "(...,63)" */
  private parseTotal(raw: number | string): number {
    if (typeof raw === 'number') return raw;
    const m = String(raw).match(/(\d+)\)?\s*$/);
    return m ? Number(m[1]) : 0;
  }

  /** Coerce a string sin nulls */
  private s(v: any): string {
    return v === undefined || v === null ? '' : String(v);
  }

  /** Formatea fecha a YYYY-MM-DD, tolerando vacío/ISO */
  private d(date: string | null | undefined): string {
    if (!date || date === 'Pendiente') {
      return '';
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    return date.includes('T') ? date.split('T')[0] : date;
  }

  // ===== Conversión API -> Frontend (parseo de catálogos) =====
  private mapBackendToFrontend(api: ApiItem): IModUtilModel & any {
    let item: ApiItem = { ...api };

    // Aplica conversión de *_param → objeto {id_param, nombre} (e institucion)
    if (this.catalogos) {
      item = this.paramService.convertirRegistroConObjetos(item, this.catalogos);
    }

    // Nombre legible (cae a texto simple si no hay objeto)
    const getNombre = (v: any, alt?: string, fallback: string = ''): string =>
      (typeof v === 'object' && v?.nombre) ? v.nombre : (alt ?? fallback);

    // Institución: puede venir string u objeto
    const institucionNombre =
      typeof item.institucion === 'object'
        ? (item.institucion?.nombre ?? '')
        : (item.institucion ?? '');

    const institucionNorm = (institucionNombre || '').trim() === '-' ? '' : (institucionNombre || '');

    return {
      id: item.id_registro,
      solicitudId: this.s(item.no_expediente ?? ''),
      nombreModUtil: item.titulo ?? '',
      solicitante: '', // si tu backend lo envía, sustitúyelo aquí
      fechaSolicitud: this.d(item.fec_solicitud),
      estatus: getNombre(item.estatus_param, item.estatus, 'En trámite'),
      descripcion: item.descripcion ?? '',
      institucion: institucionNorm,
      correo: '',
      documentos: item.archivo ? [item.archivo] : [],
      observaciones: item.observaciones ?? '',

      // Extras amigables (por si los usas en UI)
      rama: getNombre(item.rama_param, this.s(item.rama), 'Modelo de Utilidad'),
      medioIngreso: getNombre(item.medio_ingreso_param, item.medio_ingreso, 'N/A'),
      tipoSector: getNombre(item.tipo_sector_param, item.tipo_sector, 'N/A'),
      sector: getNombre(item.sector_param, undefined, 'N/A'),
      subsector: getNombre(item.subsector_param, undefined, 'N/A'),

      numeroExpediente: this.s(item.no_expediente ?? ''),
      fechaExpedicion: this.d(item.fec_expedicion),
      archivo: item.archivo || '',

      // Para DataTables si los necesitas
      ramaLabel: getNombre(item.rama_param, this.s(item.rama), '')
    } as any;
  }

  // ===== Conversión Frontend -> API (objetos/strings → IDs) =====
  private mapFrontendToBackend(mod: IModUtilModel & any): UpdateRegistroDto {
    // Construimos payload semántico con objetos si el form los maneja así
    const semantic: any = {
      no_expediente: mod.solicitudId || mod.numeroExpediente || '',
      titulo: mod.nombreModUtil || mod.denominacion || '',
      descripcion: mod.descripcion || '',

      tipo_ingreso_param: mod.tipoIngreso,   // puede ser objeto o string
      id_usuario: mod.id_usuario ?? 1,

      rama_param: mod.rama,
      medio_ingreso_param: mod.medioIngreso,
      tipo_sector_param: mod.tipoSector,
      sector_param: mod.sector,
      subsector_param: mod.subsector,

      tipo_registro_param: this.tipoIndautor,
      estatus_param: mod.estatus,

      fec_solicitud: mod.fechaSolicitud || '',
      fec_expedicion: mod.fechaExpedicion || '',
      archivo: Array.isArray(mod.documentos) && mod.documentos.length ? mod.documentos[0] : (mod.archivo || ''),
      observaciones: mod.observaciones || 'Sin observaciones',

      // institucion (si la manejas como catálogo, también se convertirá)
      institucion: mod.institucion
    };

    // Delegamos conversión objeto → id_param a parametrizaciones
    const payload = this.paramService.prepararPayload(semantic);

    // Normalizamos fechas a YYYY-MM-DD
    payload.fec_solicitud = this.d(payload.fec_solicitud) || new Date().toISOString().split('T')[0];
    payload.fec_expedicion = this.d(payload.fec_expedicion) || new Date().toISOString().split('T')[0];

    // Forzamos tipos que el backend espera
    return {
      no_expediente: this.s(payload.no_expediente),
      titulo: this.s(payload.titulo),
      tipo_ingreso_param: this.s(payload.tipo_ingreso_param || '2'),
      id_usuario: Number(payload.id_usuario ?? 1),
      rama_param: this.s(payload.rama_param || '2'), // MU por defecto
      fec_expedicion: this.s(payload.fec_expedicion),
      observaciones: this.s(payload.observaciones),
      archivo: this.s(payload.archivo),
      estatus_param: this.s(payload.estatus_param || '2'), // 'En trámite'
      medio_ingreso_param: this.s(payload.medio_ingreso_param || '1'),
      tipo_registro_param: this.s(payload.tipo_registro_param || this.tipoIndautor),
      fec_solicitud: this.s(payload.fec_solicitud),
      descripcion: this.s(payload.descripcion),
      tipo_sector_param: this.s(payload.tipo_sector_param || '5'),
      sector_param: this.s(payload.sector_param || ''),
      subsector_param: this.s(payload.subsector_param || '')
    };
  }

  // ===== Listado / Búsqueda (DataTables server-side) =====
  public getModUtiles(tableParams: any): Observable<any> {
    const { page, limit, search } = this.dtToQuery(tableParams);

    const base$ = this.paramService.getAll().pipe(
      switchMap((cats) => {
        this.catalogos = cats;

        // Construir URL
        if (search) {
          const q = encodeURIComponent(search);
          const url = `${this.searchBase}?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&q=${q}&tipo=${this.tipoIndautor}`;
          return this.api.get<ApiListResponse>(url);
        } else {
          const url = `${this.listBase}?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&tipo=${this.tipoIndautor}`;
          return this.api.get<ApiListResponse>(url);
        }
      }),
      map((res) => {
        const total = this.parseTotal(res?.total ?? 0);
        const data = Array.isArray(res?.results)
          ? res.results.map(apiItem => this.mapBackendToFrontend(apiItem))
          : [];

        return {
          draw: tableParams?.draw,
          recordsTotal: total,
          recordsFiltered: total,
          data
        };
      })
    );

    return base$;
  }

  // ===== GET por ID (detalle) =====
  public getRegistroRaw(id: number): Observable<ApiItem> {
    const url = `${this.listBase}/${encodeURIComponent(id)}/`;
    return this.api.get<ApiItem>(url);
  }

  public getModUtil(id: number): Observable<IModUtilModel & any> {
    return this.paramService.getAll().pipe(
      switchMap((cats) => {
        this.catalogos = cats;
        return this.getRegistroRaw(id);
      }),
      map(apiItem => this.mapBackendToFrontend(apiItem))
    );
  }

  // ===== PATCH: deshabilitar / habilitar =====
  public deleteModUtil(id: number): Observable<void> {
    const url = `${this.listBase}/${encodeURIComponent(id)}/disable`;
    return this.api.patch<unknown>(url, {}).pipe(map(() => { /* void */ }));
  }

  public enableModUtil(id: number): Observable<void> {
    const url = `${this.listBase}/${encodeURIComponent(id)}/enable`;
    return this.api.patch<unknown>(url, {}).pipe(map(() => { /* void */ }));
  }

  // ===== PUT: actualizar general (payload completo, con SLASH FINAL) =====
  public updateRegistro(id: number, payload: UpdateRegistroDto): Observable<void> {
    const url = `${this.listBase}/${encodeURIComponent(id)}/`; // slash final
    return this.api.put(url, payload).pipe(map(() => { /* void */ }));
  }

  // ===== PUT: actualizar desde modelo de UI (acepta texto/objetos) =====
  public updateFromModel(id: number, model: IModUtilModel & any): Observable<void> {
    const dto = this.mapFrontendToBackend(model);
    return this.updateRegistro(id, dto);
  }

  // ===== PUT: actualizar solo estatus (preservando el resto) =====
  public updateModUtilStatus(modUtilId: number, newStatus: IModUtilModel['estatus']): Observable<void> {
    return this.getModUtil(modUtilId).pipe(
      map((model) => {
        const merged = { ...model, estatus: newStatus };
        return this.mapFrontendToBackend(merged);
      }),
      switchMap((dto) => this.updateRegistro(modUtilId, dto))
    );
  }

  // ===== Métodos no disponibles (se mantienen) =====
  public createModUtil(_: IModUtilModel) {
    return throwError(() => new Error('Crear no disponible: falta endpoint de backend.'));
  }
  public updateModUtil(_: number, __: IModUtilModel) {
    return throwError(() => new Error('Actualizar no disponible: usa updateFromModel()/updateRegistro().'));
  }
  public updateModUtilObservations(_: number, __: string) {
    return throwError(() => new Error('Actualizar observaciones no disponible: falta endpoint de backend.'));
  }
  public updateModUtilStatusAndObservations(_: number, __: { estatus?: IModUtilModel['estatus']; observaciones?: string }) {
    return throwError(() => new Error('Actualizar estatus/observaciones no disponible: falta endpoint de backend.'));
  }
  public getAllModUtiles() {
    return throwError(() => new Error('Listado sin paginar no disponible: falta endpoint de backend.'));
  }
  public getModUtilesByStatus(_: IModUtilModel['estatus']) {
    return throwError(() => new Error('Filtro por estatus no disponible: falta endpoint de backend.'));
  }
  public getModUtilesStats() {
    return throwError(() => new Error('Estadísticas no disponibles: falta endpoint de backend.'));
  }
}
