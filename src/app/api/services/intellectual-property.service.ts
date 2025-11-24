import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IPatentModel, PatenteUIModel, Inventor } from '../models/patent.model';

import { Catalogos, Parametrizacion, ParametrizacionesService } from './parametrizaciones.service';

export interface IPaginatedResponse {
  total: number;
  page: number;
  limit: number;
  results: any[];
}

/**
 * Servicio genérico para manejar Propiedad Intelectual
 * Soporta IMPI (tipo 44) e INDAUTOR (tipo 45)
 */
@Injectable({
  providedIn: 'root'
})
export class IntellectualPropertyService {
  private apiUrl = '/api/registros';
  private catalogos?: Catalogos;

  constructor(
    private http: HttpClient,
    private paramService: ParametrizacionesService
  ) {
    this.cargarCatalogos();
  }

  private cargarCatalogos(): void {
    this.paramService.getAll().subscribe({
      next: (cats) => {
        this.catalogos = cats;
      },
      error: (err) => console.error('Error cargando parametrizaciones:', err),
    });
  }

  /**
   * Obtiene registros con paginación y búsqueda
   * @param tipoRegistro '44' para IMPI, '45' para INDAUTOR
   */
  public getRegistros(tipoRegistro: string, tableParams: any, q?: string): Observable<any> {
    const page = Math.floor((tableParams.start || 0) / (tableParams.length || 10)) + 1;
    const limit = tableParams.length || 10;
    const searchValue = q || '';

    let sortColumn = 'fec_solicitud';
    let sortOrder = 'DESC';

    if (tableParams.order && tableParams.order.length > 0) {
      const orderInfo = tableParams.order[0];
      const columnIndex = orderInfo.column;
      const direction = orderInfo.dir.toUpperCase();

      const columnMap: { [key: number]: string } = {
        0: 'no_expediente',
        1: 'id_registro',
        2: 'rama_param',
        3: 'titulo',
        4: 'instituciones',
        5: 'fec_solicitud'
      };

      if (columnMap[columnIndex]) {
        sortColumn = columnMap[columnIndex];
        sortOrder = direction;
      }
    }

    return this.paramService.getAll().pipe(
      switchMap((cats) => {
        this.catalogos = cats;

        if (searchValue && searchValue.trim() !== '') {
          const safeSortColumn = (['no_expediente', 'id_registro', 'rama_param', 'titulo', 'fec_solicitud'].includes(sortColumn))
            ? sortColumn
            : 'fec_solicitud';
          return this.searchRegistros(tipoRegistro, searchValue, page, limit, safeSortColumn, sortOrder);
        }
        return this.listRegistros(tipoRegistro, page, limit, sortColumn, sortOrder);
      }),
      map((response) => {
        const formatted = this.formatForDataTables(response, tableParams.draw);
        return formatted;
      })
    );
  }

  private listRegistros(tipoRegistro: string, page: number = 1, limit: number = 10,
    sortColumn: string = 'fec_solicitud', sortOrder: string = 'DESC'): Observable<IPaginatedResponse> {
    const params = new HttpParams()
      .set('tipo', tipoRegistro)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('filter', sortColumn)
      .set('order', sortOrder);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        let total = 0;
        let results = [];

        if (response.total !== undefined) {
          const totalValue = response.total;
          if (typeof totalValue === 'string' && totalValue.includes(',')) {
            const parts = totalValue.replace('(', '').replace(')', '').split(',');
            const lastPart = parts[parts.length - 1].trim();
            total = parseInt(lastPart, 10);
          } else if (typeof totalValue === 'number') {
            total = totalValue;
          } else if (typeof totalValue === 'string') {
            total = parseInt(totalValue, 10);
          }
          results = response.results || [];
        } else if (response.count !== undefined) {
          total = response.count;
          results = response.results || [];
        } else if (Array.isArray(response)) {
          total = response.length;
          results = response;
        }

        if (isNaN(total) || total < 0) {
          total = 0;
        }

        return { total, page, limit, results };
      })
    );
  }

  private searchRegistros(tipoRegistro: string, query: string, page: number = 1, limit: number = 10,
    sortColumn: string = 'fec_solicitud', sortOrder: string = 'DESC'): Observable<IPaginatedResponse> {
    const params = new HttpParams()
      .set('tipo', tipoRegistro)
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('filter', sortColumn)
      .set('order', sortOrder);

    return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
      map(response => {
        let total = 0;
        let results = [];

        if (response.total !== undefined) {
          const totalValue = response.total;
          if (typeof totalValue === 'string' && totalValue.includes(',')) {
            const parts = totalValue.replace('(', '').replace(')', '').split(',');
            const lastPart = parts[parts.length - 1].trim();
            total = parseInt(lastPart, 10);
          } else if (typeof totalValue === 'number') {
            total = totalValue;
          } else if (typeof totalValue === 'string') {
            total = parseInt(totalValue, 10);
          }
          results = response.results || [];
        } else if (response.count !== undefined) {
          total = response.count;
          results = response.results || [];
        } else if (Array.isArray(response)) {
          total = response.length;
          results = response;
        }

        if (isNaN(total) || total < 0) {
          total = 0;
        }

        return { total, page, limit, results };
      })
    );
  }

  private formatForDataTables(response: IPaginatedResponse, draw: number): any {
    const formattedData = {
      draw,
      recordsTotal: response.total || 0,
      recordsFiltered: response.total || 0,
      data: (response.results || []).map(registro => {
        const uiModel = this.mapBackendToFrontend(registro);
        return uiModel;
      })
    };
    return formattedData;
  }

  private findParamById(idParam: number): Parametrizacion | undefined {
    if (!this.catalogos) {
      return undefined;
    }

    for (const temaIdStr of Object.keys(this.catalogos)) {
      const tema = this.catalogos[Number(temaIdStr)];
      const encontrado = tema?.mapa[idParam];
      if (encontrado) {
        return encontrado;
      }
    }

    return undefined;
  }

  getSectorChainFromSubsector(idSubsector: any): {
    tipoSector: string;
    sector: string;
    subsector: string;
    tipoSectorId: number | null;
    sectorId: number | null;
  } {
    if (!this.catalogos) {
      return { tipoSector: 'N/A', sector: 'N/A', subsector: 'N/A', tipoSectorId: null, sectorId: null };
    }

    const id = Number(idSubsector);
    if (isNaN(id)) {
      return { tipoSector: 'N/A', sector: 'N/A', subsector: 'N/A', tipoSectorId: null, sectorId: null };
    }

    const catalogoSubsectores = this.catalogos[17];
    const sub = catalogoSubsectores?.mapa[id];

    if (!sub) {
      return { tipoSector: 'N/A', sector: 'N/A', subsector: 'N/A', tipoSectorId: null, sectorId: null };
    }

    const subsectorNombre = sub.nombre;
    let sectorId: number | null = null;
    let tipoSectorId: number | null = null;

    const sectorParam = sub.id_param_padre
      ? this.findParamById(sub.id_param_padre)
      : undefined;

    sectorId = sectorParam?.id_param ?? null;
    const sectorNombre = sectorParam?.nombre ?? 'N/A';

    const tipoSectorParam = sectorParam?.id_param_padre
      ? this.findParamById(sectorParam.id_param_padre)
      : undefined;

    tipoSectorId = tipoSectorParam?.id_param ?? null;
    const tipoSectorNombre = tipoSectorParam?.nombre ?? 'N/A';

    return {
      tipoSector: tipoSectorNombre,
      sector: sectorNombre,
      subsector: subsectorNombre,
      tipoSectorId,
      sectorId,
    };
  }

  private getNombreByIdParam(idParam: any): string {
    if (!this.catalogos || idParam === null || idParam === undefined) {
      return '';
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      return '';
    }

    for (const temaId of Object.keys(this.catalogos)) {
      const tema = this.catalogos[Number(temaId)];
      const encontrado = tema?.mapa[id];
      if (encontrado) {
        return encontrado.nombre;
      }
    }

    return '';
  }

  private getNombreInstitucionFromCatalogo(idInstitucion: any): string {
    if (!this.catalogos || !idInstitucion) {
      return '';
    }

    const id = Number(idInstitucion);
    if (isNaN(id)) {
      return '';
    }

    return this.paramService.getNombre(this.catalogos, 17, id);
  }

  private mapBackendToFrontend(backendRegistro: any): PatenteUIModel {
    if (this.catalogos) {
      backendRegistro = this.paramService.convertirRegistroConObjetos(backendRegistro, this.catalogos);
    }

    const inventores =
      Array.isArray(backendRegistro.investigadores)
        ? backendRegistro.investigadores.map((inv: any) => {
          const nombreCompleto = [inv.nombre, inv.ape_pat, inv.ape_mat]
            .filter((p: string | null | undefined) => !!p)
            .join(' ')
            .trim();

          const sexoNombre = this.getNombreByIdParam(inv.sexo_param);
          const tipoInvestigador = this.getNombreByIdParam(inv.tipo_investigador_param);
          const institucion = this.getNombreInstitucionFromCatalogo(inv.id_institucion);
          const departamento = this.getNombreByIdParam(inv.departamento_param ?? inv.depto_param);
          const programaEducativo = this.getNombreByIdParam(inv.programa_educativo_param);
          const cuerpoAcademico = this.getNombreByIdParam(inv.cuerpo_academico_param);

          let sexo: 'M' | 'F' | '' = '';
          if (sexoNombre) {
            const s = sexoNombre.toUpperCase();
            if (s.startsWith('M')) {
              sexo = 'M';
            } else if (s.startsWith('F')) {
              sexo = 'F';
            }
          }

          return {
            curp: inv.curp || '',
            nombreCompleto,
            sexo: sexo || 'M',
            tipoInvestigador: tipoInvestigador || 'N/A',
            institucion: institucion || 'N/A',
            programaEducativo: programaEducativo || 'N/A',
            cuerpoAcademico: cuerpoAcademico || 'N/A',
            departamento: departamento || 'N/A',
            fechaAfiliacion: inv.fec_ini ? inv.fec_ini.split('T')[0] : '',
            fechaFin: inv.fec_fin ? inv.fec_fin.split('T')[0] : '',
          };
        })
        : [];

    const institucion_nombre =
      (Array.isArray(backendRegistro.instituciones) && backendRegistro.instituciones.length > 0)
        ? (typeof backendRegistro.instituciones[0] === 'string'
            ? backendRegistro.instituciones[0]
            : backendRegistro.instituciones[0]?.nombre)
        : backendRegistro.institucion || 'N/A';

    const id_institucion =
      (Array.isArray(backendRegistro.id_instituciones) && backendRegistro.id_instituciones.length > 0)
        ? backendRegistro.id_instituciones[0]
        : backendRegistro.id_institucion || null;

    const usuario =
      backendRegistro.id_usuarios?.[0] ||
      backendRegistro.id_usuario ||
      'N/A';

    const fec_solicitud_backend = backendRegistro.fec_solicitud;
    const fec_expedicion_backend = backendRegistro.fec_expedicion;

    let rama_nombre = '';

    if (backendRegistro.rama_param) {
      if (typeof backendRegistro.rama_param === 'object') {
        rama_nombre = backendRegistro.rama_param.nombre || '';
      } else {
        const fromCatalog = this.getNombreByIdParam(backendRegistro.rama_param);
        rama_nombre = fromCatalog || String(backendRegistro.rama_param);
      }
    }

    const estatus_nombre =
      (backendRegistro.estatus_param && typeof backendRegistro.estatus_param === 'object'
        ? backendRegistro.estatus_param.nombre
        : '') || 'En trámite';

    const medio_ingreso_nombre =
      (backendRegistro.medio_ingreso_param && typeof backendRegistro.medio_ingreso_param === 'object'
        ? backendRegistro.medio_ingreso_param.nombre
        : '') || '';

    let tipo_sector_nombre =
      (backendRegistro.tipo_sector_param && typeof backendRegistro.tipo_sector_param === 'object'
        ? backendRegistro.tipo_sector_param.nombre
        : '') || 'N/A';
    let tipo_sector_param_id =
      backendRegistro.tipo_sector_param && typeof backendRegistro.tipo_sector_param === 'object'
        ? backendRegistro.tipo_sector_param.id_param
        : backendRegistro.tipo_sector_param ?? null;

    const id_subsector =
      backendRegistro.id_subsector ??
      (backendRegistro.id_subsector_obj?.id_param ?? null);

    let sector_param_id: number | null = null;
    if (backendRegistro.sector_param) {
      sector_param_id =
        typeof backendRegistro.sector_param === 'object'
          ? backendRegistro.sector_param.id_param ?? null
          : Number(backendRegistro.sector_param) || null;
    }

    let subsector_nombre =
      backendRegistro.id_subsector_obj
        ? backendRegistro.id_subsector_obj.nombre
        : id_subsector
          ? String(id_subsector)
          : 'N/A';

    if (id_subsector) {
      const chain = this.getSectorChainFromSubsector(id_subsector);

      if (!tipo_sector_nombre || tipo_sector_nombre === 'N/A') {
        tipo_sector_nombre = chain.tipoSector;
      }
      if (!tipo_sector_param_id && chain.tipoSectorId) {
        tipo_sector_param_id = chain.tipoSectorId;
      }

      if (!backendRegistro.sector || backendRegistro.sector === '') {
        backendRegistro.sector = chain.sector;
      }
      if (!sector_param_id && chain.sectorId) {
        sector_param_id = chain.sectorId;
      }

      if (!subsector_nombre || subsector_nombre === 'N/A') {
        subsector_nombre = chain.subsector;
      }
    }

    const result: PatenteUIModel = {
      id: backendRegistro.id_registro,
      solicitudId: backendRegistro.no_expediente || '',
      nombrePatente: backendRegistro.titulo || '',
      solicitante: usuario?.toString() || '',
      fechaSolicitud: fec_solicitud_backend
        ? fec_solicitud_backend.split('T')[0]
        : '',
      estatus: estatus_nombre as IPatentModel['estatus'],
      institucion: institucion_nombre,
      correo: backendRegistro.correo || '',
      documentos: backendRegistro.archivo ? [backendRegistro.archivo] : [],

      id_registro: backendRegistro.id_registro,
      no_expediente: backendRegistro.no_expediente,
      titulo: backendRegistro.titulo,
      tipo_ingreso_param: backendRegistro.tipo_ingreso_param,
      rama_param: rama_nombre,
      fec_expedicion: backendRegistro.fec_expedicion,
      observaciones: backendRegistro.observaciones,
      archivo: backendRegistro.archivo,
      estatus_param: backendRegistro.estatus_param,
      medio_ingreso_param: medio_ingreso_nombre,
      tipo_registro_param: backendRegistro.tipo_registro_param,
      fec_solicitud: backendRegistro.fec_solicitud,
      descripcion: backendRegistro.descripcion || '',

      numeroExpediente: backendRegistro.no_expediente || '',
      numeroTitulo: backendRegistro.no_titulo || '',
      denominacion: backendRegistro.titulo || '',
      fechaExpedicion: fec_expedicion_backend
        ? fec_expedicion_backend.split('T')[0]
        : '',
      tecnologicoOrigen: institucion_nombre,
      id_institucion: id_institucion,
      id_cepat: backendRegistro.id_cepat || null,
      cePat: backendRegistro.cepat || 'N/A',
      anioRenovacion: backendRegistro.anio_renovacion
        ? String(backendRegistro.anio_renovacion)
        : 'N/A',

      rama: rama_nombre,
      tipoSector: tipo_sector_nombre,
      sector: backendRegistro.sector || '',
      subsector: subsector_nombre,
      tipo_sector_param: tipo_sector_param_id ?? null,
      sector_param: sector_param_id,
      id_subsector: id_subsector ? Number(id_subsector) : null,

      inventores,
    };

    return result;
  }

  public getRegistro(id: number): Observable<PatenteUIModel> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`).pipe(
      map(registro => this.mapBackendToFrontend(registro))
    );
  }

  public createRegistro(registro: IPatentModel, tipoRegistro: string): Observable<IPatentModel> {
    const backendData = this.mapFrontendToBackend(registro, tipoRegistro);
    return this.http.post<any>(this.apiUrl, backendData).pipe(
      map(response => this.mapBackendToFrontend(response))
    );
  }

  public updateRegistro(id: number, registro: any, tipoRegistro: string): Observable<IPatentModel> {
    const backendData = this.mapFrontendToBackend(registro, tipoRegistro);
    return this.http.put<any>(`${this.apiUrl}/${id}/`, backendData).pipe(
      map(response => this.mapBackendToFrontend(response))
    );
  }

  public deleteRegistro(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/disable`, {});
  }

  private mapFrontendToBackend(registro: any, tipoRegistro: string): any {
    const formatDate = (date: string | null | undefined): string => {
      if (!date || date === 'Pendiente') {
        return new Date().toISOString().split('T')[0];
      }
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }
      if (date.includes('T')) {
        return date.split('T')[0];
      }
      return date;
    };

    const formatDateOrNull = (date: string | null | undefined): string | null => {
      if (!date || date === 'Pendiente') {
        return null;
      }
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }
      if (date.includes('T')) {
        return date.split('T')[0];
      }
      return date;
    };

    const ramaParam = registro.rama_param != null
      ? String(registro.rama_param)
      : this.mapRamaToBackend(registro.rama);

    const medioIngresoParam = registro.medio_ingreso_param != null
      ? String(registro.medio_ingreso_param)
      : this.mapMedioIngresoToBackend(registro.medioIngreso);

    let tipoSectorParam = registro.tipo_sector_param != null
      ? String(registro.tipo_sector_param)
      : this.mapTipoSectorToBackend(registro.tipoSector);

    const estatusParam = registro.estatus_param != null
      ? String(registro.estatus_param)
      : this.mapEstatusToBackend(registro.estatus);

    const idSubsector = registro.id_subsector != null ? Number(registro.id_subsector) : null;

    if ((!tipoSectorParam || tipoSectorParam.trim() === '') && idSubsector) {
      const chain = this.getSectorChainFromSubsector(idSubsector);
      if (chain.tipoSectorId) {
        tipoSectorParam = String(chain.tipoSectorId);
      }
    }

    const idUsuario = registro.solicitante
      ? parseInt(registro.solicitante, 10)
      : (registro.id_usuario || 0);

    const tipoIngresoParam = (() => {
      if (typeof registro.tipo_ingreso_param === 'number') return String(registro.tipo_ingreso_param);
      if (typeof registro.tipo_ingreso_param === 'string' && registro.tipo_ingreso_param.trim() !== '') {
        return registro.tipo_ingreso_param;
      }
      return tipoRegistro;
    })();

    return {
      no_expediente: registro.no_expediente || registro.solicitudId || registro.numeroExpediente || '',
      titulo: registro.titulo || registro.denominacion || registro.nombrePatente || '',
      descripcion: registro.descripcion || '',
      tipo_ingreso_param: tipoIngresoParam,
      id_usuario: idUsuario,
      rama_param: ramaParam,
      fec_expedicion: formatDateOrNull(registro.fechaExpedicion || registro.fec_expedicion),
      observaciones: registro.observaciones || '',
      archivo: registro.archivo || (Array.isArray(registro.documentos) ? registro.documentos[0] : ''),
      estatus_param: estatusParam,
      medio_ingreso_param: medioIngresoParam,
      tipo_sector_param: tipoSectorParam,
      tipo_registro_param: tipoRegistro,
      fec_solicitud: formatDate(registro.fechaSolicitud),
      tecnologico_origen: registro.tecnologicoOrigen || null,
      anio_renovacion: registro.anioRenovacion || null,
      id_subsector: idSubsector,
    };
  }

  private mapTipoSectorToBackend(tipoSector: string): string {
    const normalize = (value: string) => (value || '').trim().toUpperCase();

    const tipoSectorMap: { [key: string]: string } = {
      'PRIMARIO': '1',
      'SECUNDARIO': '2',
      'TERCIARIO': '3',
      'CUATERNARIO': '4',
      'QUINARIO': '5',
    };

    const key = normalize(tipoSector);
    const direct = tipoSectorMap[key];

    if (direct) {
      return direct;
    }

    return tipoSectorMap['TERCIARIO'];
  }

  private mapRamaToBackend(rama: string): string {
    const raw = rama != null ? String(rama).trim() : '';

    if (/^\d+$/.test(raw)) {
      return raw;
    }

    const normalized = raw.toLowerCase();

    const ramaMap: { [key: string]: string } = {
      'invención': '177',
      'Marca': '4',
      'patente': '177',
      'marca': '178',
      'aviso comercial': '179',
      'diseño industrial': '180',
      'diseno industrial': '180',
      'modelo de utilidad': '181',
      'audiovisual': '8',
      'copilación de datos (base de datos)': '9',
      'copilacion de datos (base de datos)': '9',
      'dibujo': '10',
      'isbn': '11',
      'issn': '12',
      'literaria': '13',
      'literaria (arte digital por analogía)': '14',
      'literaria (arte digital por analogia)': '14',
      'programa de computación': '15',
      'programa de computacion': '15',
      'programa de computación (app por analogía)': '16',
      'programa de computacion (app por analogia)': '16',
      'reserva de derechos': '17',
      'trazado de circuito': '176',
      'N/A': '1'
    };

    return ramaMap[normalized] || '1';
  }

  private mapMedioIngresoToBackend(medioIngreso: string): string {
    const raw = medioIngreso != null ? String(medioIngreso).trim() : '';

    if (/^\d+$/.test(raw)) {
      return raw;
    }

    const normalized = raw.toUpperCase();
    const medioMap: { [key: string]: string } = {
      'INDAUTOR': '38',
      'ISBN': '39',
      'INDAINDAUTOR - CENTRO NACIONAL DE ISSN UTOR': '40',
      'VENTANILLA': '41',
      'INDAUTOR - CENTRO NACIONAL DE ISSN': '42',
      'INDARELIN': '43',
      'CUENTA PASE IMPI': '43',
      'EN LÍNEA': '43',
      'EN LINEA': '43',
      'N/A': '1',
    };
    return medioMap[normalized] || '1';
  }

  private mapEstatusToBackend(estatus: string | null | undefined): string {
    const raw = (estatus || '').trim();
    const normalized = raw.toLowerCase();

    const estatusMap: { [key: string]: string } = {
      'registrada': '34',
      'en trámite': '27',
      'en tramite': '27',
      'trámite con observaciones': '28',
      'tramite con observaciones': '28',
      'aprobada': '26',
      'concluida': '30',
      'cancelada': '31',
      'en pausa': '32',
      'en espera de validación': '33',
      'en espera de validacion': '33',
      'confirmada': '26',
      'pendiente': '27',
      'con observaciones': '28',
      'rechazada': '29',
      'finalizada': '30',
      'notificada al tecnológico': '34',
      'notificada al tecnologico': '34'
    };

    return estatusMap[normalized] || '27';
  }

  public updateRegistroStatus(registroId: number, newStatus: IPatentModel['estatus'], tipoRegistro: string): Observable<any> {
    return this.updateRegistro(registroId, { estatus: newStatus } as IPatentModel, tipoRegistro);
  }

  public updateRegistroObservations(registroId: number, observations: string, tipoRegistro: string): Observable<any> {
    return this.updateRegistro(registroId, { observaciones: observations } as IPatentModel, tipoRegistro);
  }

  public updateRegistroStatusAndObservations(
    registroId: number,
    data: {
      estatus?: IPatentModel['estatus'],
      observaciones?: string
    },
    tipoRegistro: string
  ): Observable<any> {
    return this.getRegistro(registroId).pipe(
      switchMap(registro => {
        const updatedRegistro = {
          ...registro,
          ...(data.estatus && { estatus: data.estatus }),
          ...(data.observaciones !== undefined && { observaciones: data.observaciones })
        };
        return this.updateRegistro(registroId, updatedRegistro, tipoRegistro);
      }),
      map(updatedRegistro => ({
        success: true,
        message: 'Registro actualizado correctamente',
        registro: updatedRegistro
      }))
    );
  }

  public getAllRegistros(tipoRegistro: string): Observable<IPatentModel[]> {
    return this.listRegistros(tipoRegistro, 1, 1000).pipe(
      map(response => response.results.map(r => this.mapBackendToFrontend(r)))
    );
  }

  public getRegistrosStats(tipoRegistro: string): Observable<any> {
    return this.getAllRegistros(tipoRegistro).pipe(
      map(registros => ({
        total: registros.length,
        enTramite: registros.filter(r => r.estatus === 'En trámite').length,
        aprobadas: registros.filter(r => r.estatus === 'Aprobada').length,
        registradas: registros.filter(r => r.estatus === 'Registrada').length,
        concluidas: registros.filter(r => r.estatus === 'Concluida').length,
        conObservaciones: registros.filter(r => r.estatus === 'Trámite con observaciones').length
      }))
    );
  }

  /**
   * Obtiene el registro raw directamente desde el backend sin mapeo
   */
  public getRegistroRaw(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }
}
