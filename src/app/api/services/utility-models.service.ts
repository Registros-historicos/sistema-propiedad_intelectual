// src/app/api/services/utility-models.service.ts
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { IModUtilModel } from '../models/mod-util.model';
import { ApiCrudService } from '../ApiCrud.service';

// ===== Tipos de la API (listado/detalle) =====
export type ApiItem = {
  id_registro: number;
  no_expediente: number | string;
  titulo: string;

  // Pueden venir como number o string
  tipo_ingreso_param?: number | string;
  rama_param?: number | string;
  estatus_param?: number | string;
  medio_ingreso_param?: number | string;
  tipo_registro_param?: number | string;
  tipo_sector_param?: number | string;

  // Campos alternativos / amigables que a veces manda el backend
  rama?: number | string;

  id_usuario?: number;
  fec_expedicion?: string | null;
  observaciones?: string | null;
  archivo?: string | null;
  fec_solicitud?: string | null;
  descripcion?: string | null;

  // Institución puede venir ya en el payload de algunos endpoints
  institucion?: string;
};

type ApiListResponse = {
  total: number | string;   // puede venir como "(...,63)"
  page: number;
  limit: number;
  results: ApiItem[];
};

// DTO EXACTO que pide tu backend en PUT /api/registros/{id}
export interface UpdateRegistroDto {
  no_expediente: string;
  titulo: string;
  tipo_ingreso_param: string;
  id_usuario: number;
  rama_param: string;
  fec_expedicion: string | null;
  observaciones: string | null;
  archivo: string | null;
  estatus_param: string;
  medio_ingreso_param: string;
  tipo_registro_param: string;
  fec_solicitud: string | null;
  descripcion: string | null;
  tipo_sector_param: string;
}

@Injectable({ providedIn: 'root' })
export class UtilityModelsService {
  private readonly listBase = '/api/registros/';
  private readonly searchBase = '/api/registros/search/';
  private readonly tipoIndautor = 44; // INDAUTOR

  constructor(private api: ApiCrudService) {}

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

  /** Mapea el item de API → modelo que usa la UI */
  private mapToIModUtilModel(it: ApiItem): IModUtilModel {
    return {
      id: it.id_registro,
      solicitudId: String(it.no_expediente ?? ''),
      nombreModUtil: it.titulo ?? '',
      solicitante: '', // no viene en payload
      fechaSolicitud: it.fec_solicitud ?? '',
      estatus: 'En trámite', // si en el futuro se mapea desde estatus_param, se ajusta aquí
      descripcion: it.descripcion ?? '',
      institucion: it.institucion ?? '',   // úsala si viene
      correo: '',
      documentos: it.archivo ? [it.archivo] : [],
      observaciones: it.observaciones ?? ''
    };
  }

  /** Convierte registro de API → DTO PUT, preservando valores (para update seguro) */
  private buildUpdateDtoFromApi(record: ApiItem, overrides?: Partial<UpdateRegistroDto>): UpdateRegistroDto {
    return {
      no_expediente: String(record.no_expediente ?? ''),
      titulo: String(record.titulo ?? ''),
      tipo_ingreso_param: String(record.tipo_ingreso_param ?? '45'),
      id_usuario: Number(record.id_usuario ?? 0),
      rama_param: String(record.rama_param ?? record.rama ?? ''),
      fec_expedicion: record.fec_expedicion ?? null,
      observaciones: record.observaciones ?? null,
      archivo: record.archivo ?? null,
      estatus_param: String(overrides?.estatus_param ?? record.estatus_param ?? ''),
      medio_ingreso_param: String(record.medio_ingreso_param ?? ''),
      tipo_registro_param: String(record.tipo_registro_param ?? this.tipoIndautor),
      fec_solicitud: record.fec_solicitud ?? null,
      descripcion: record.descripcion ?? null,
      tipo_sector_param: String(record.tipo_sector_param ?? ''),
      ...(overrides ?? {})
    };
  }

  // ===== Listado / Búsqueda (DataTables server-side) =====
  public getModUtiles(tableParams: any): Observable<any> {
    const { page, limit, search } = this.dtToQuery(tableParams);
    let url: string;

    if (search) {
      const q = encodeURIComponent(search);
      url = `${this.searchBase}?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&q=${q}&tipo=${this.tipoIndautor}`;
    } else {
      url = `${this.listBase}?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(page)}&tipo=${this.tipoIndautor}`;
    }

    return this.api.get<ApiListResponse>(url).pipe(
      map((res) => {
        const total = this.parseTotal(res?.total ?? 0);
        const data = Array.isArray(res?.results)
          ? res.results.map((r) => {
            const base = this.mapToIModUtilModel(r);
            return {
              ...base,
              // Mostrar el NÚMERO de la rama tal como viene del backend
              ramaLabel: String(r.rama_param ?? r.rama ?? ''),
            } as any;
          })
          : [];
        return {
          draw: tableParams?.draw,
          recordsTotal: total,
          recordsFiltered: total,
          data
        };
      })
    );
  }

  // ===== GET por ID (detalle) =====
  /** JSON crudo del backend */
  public getRegistroRaw(id: number): Observable<ApiItem> {
    const url = `/api/registros/${encodeURIComponent(id)}/`; // slash final según swagger
    return this.api.get<ApiItem>(url);
  }

  /** Detalle mapeado a IModUtilModel + ramaLabel como número */
  public getModUtil(id: number): Observable<IModUtilModel> {
    const url = `/api/registros/${encodeURIComponent(id)}/`;
    return this.api.get<ApiItem>(url).pipe(
      map((res) => {
        const base = this.mapToIModUtilModel(res);
        return {
          ...base,
          ramaLabel: String(res.rama_param ?? res.rama ?? ''),
          institucion: res.institucion ?? base.institucion
        } as any;
      })
    );
  }

  // ===== PATCH: deshabilitar / habilitar =====
  /** Baja lógica (deshabilitar) — estilo compatible con tu mock (Observable<void>) */
  public deleteModUtil(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      const url = `/api/registros/${encodeURIComponent(id)}/disable`;
      this.api.patch<unknown>(url, {}).subscribe({
        next: () => { observer.next(); observer.complete(); },
        error: (err) => observer.error(err)
      });
    });
  }

  /** Habilitar — estilo compatible con tu mock (Observable<void>) */
  public enableModUtil(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      const url = `/api/registros/${encodeURIComponent(id)}/enable`;
      this.api.patch<unknown>(url, {}).subscribe({
        next: () => { observer.next(); observer.complete(); },
        error: (err) => observer.error(err)
      });
    });
  }

  // ===== PUT: actualizar general (payload completo) =====
  public updateRegistro(id: number, payload: UpdateRegistroDto): Observable<void> {
    const url = `/api/registros/${encodeURIComponent(id)}`;
    return this.api.put(url, payload).pipe(map(() => { /* void */ }));
  }

  // ===== PUT: actualizar solo estatus (preserva el resto de campos) =====
  public updateModUtilStatus(modUtilId: number, newStatus: string): Observable<void> {
    return this.getRegistroRaw(modUtilId).pipe(
      map((record) => this.buildUpdateDtoFromApi(record, { estatus_param: String(newStatus) })),
      switchMap((dto) => this.updateRegistro(modUtilId, dto))
    );
  }

  // ===== No simulamos métodos locales =====
  public createModUtil(_: IModUtilModel) {
    return throwError(() => new Error('Crear no disponible: falta endpoint de backend.'));
  }
  public updateModUtil(_: number, __: IModUtilModel) {
    return throwError(() => new Error('Actualizar no disponible: usa updateRegistro().'));
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
