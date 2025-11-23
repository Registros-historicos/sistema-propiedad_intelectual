import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IPatentModel, PatenteUIModel, Inventor } from '../models/patent.model';

import { Catalogos, Parametrizacion, ParametrizacionesService } from './parametrizaciones.service';

export interface IPaginatedPatentsResponse {
  total: number;
  page: number;
  limit: number;
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PatentsService {
  private apiUrl = '/api/registros';
  private readonly TIPO_PATENTE = '44';
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
  public getPatents(tableParams: any, q?: string): Observable<any> {
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

    // 🔹 Esperar a que los catálogos estén cargados antes de formatear las patentes
    return this.paramService.getAll().pipe(
      switchMap((cats) => {
        this.catalogos = cats;

        // 🔹 Elegir entre búsqueda o listado normal
        if (searchValue && searchValue.trim() !== '') {
          const safeSortColumn = (['no_expediente', 'id_registro', 'rama_param', 'titulo', 'fec_solicitud'].includes(sortColumn))
            ? sortColumn
            : 'fec_solicitud';
          return this.searchPatents(searchValue, page, limit, safeSortColumn, sortOrder);

        }
        return this.listPatents(page, limit, sortColumn, sortOrder);
      }),
      map((response) => {
        // 🔹 Ahora sí formatear con los catálogos ya cargados
        const formatted = this.formatForDataTables(response, tableParams.draw);
        return formatted;
      })
    );
  }


  private listPatents(page: number = 1, limit: number = 10, sortColumn: string = 'fec_solicitud',
    sortOrder: string = 'DESC'): Observable<IPaginatedPatentsResponse> {
    const params = new HttpParams()
      .set('tipo', this.TIPO_PATENTE)
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
  } {
    if (!this.catalogos) {
      return { tipoSector: 'N/A', sector: 'N/A', subsector: 'N/A' };
    }

    const id = Number(idSubsector);
    if (isNaN(id)) {
      return { tipoSector: 'N/A', sector: 'N/A', subsector: 'N/A' };
    }

    const catalogoSubsectores = this.catalogos[17];
    const sub = catalogoSubsectores?.mapa[id];

    if (!sub) {
      return { tipoSector: 'N/A', sector: 'N/A', subsector: 'N/A' };
    }

    const subsectorNombre = sub.nombre;

    const sectorParam = sub.id_param_padre
      ? this.findParamById(sub.id_param_padre)
      : undefined;

    const sectorNombre = sectorParam?.nombre ?? 'N/A';

    const tipoSectorParam = sectorParam?.id_param_padre
      ? this.findParamById(sectorParam.id_param_padre)
      : undefined;

    const tipoSectorNombre = tipoSectorParam?.nombre ?? 'N/A';

    return {
      tipoSector: tipoSectorNombre,
      sector: sectorNombre,
      subsector: subsectorNombre,
    };
  }


  private searchPatents(query: string, page: number = 1, limit: number = 10, sortColumn: string = 'fec_solicitud',
    sortOrder: string = 'DESC'): Observable<IPaginatedPatentsResponse> {
    const params = new HttpParams()
      .set('tipo', this.TIPO_PATENTE)
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

  private formatForDataTables(response: IPaginatedPatentsResponse, draw: number): any {
    const formattedData = {
      draw,
      recordsTotal: response.total || 0,
      recordsFiltered: response.total || 0,
      data: (response.results || []).map(patent => {
        const uiPatent = this.mapBackendToFrontend(patent);

        return uiPatent;
      })
    };
    return formattedData;
  }

  // Busca el nombre de un parámetro recorriendo todos los temas de catálogo
  private getNombreByIdParam(idParam: any): string {
    if (!this.catalogos || idParam === null || idParam === undefined) {
      return '';
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      return '';
    }

    // this.catalogos: { [idTema: number]: { mapa: { [id_param]: Parametrizacion } } }
    for (const temaId of Object.keys(this.catalogos)) {
      const tema = this.catalogos[Number(temaId)];
      const encontrado = tema?.mapa[id];
      if (encontrado) {
        return encontrado.nombre;
      }
    }

    return '';
  }

  // Obtiene el nombre de la institución a partir del id_institucion
  // 17 es el id_tema que usas para institución en el mapping de ParametrizacionesService
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


  private mapBackendToFrontend(backendPatent: any): PatenteUIModel {
    if (this.catalogos) {
      backendPatent = this.paramService.convertirRegistroConObjetos(backendPatent, this.catalogos);
    }

    const inventores =
      Array.isArray(backendPatent.investigadores)
        ? backendPatent.investigadores.map((inv: any) => {
          const nombreCompleto = [inv.nombre, inv.ape_pat, inv.ape_mat]
            .filter((p: string | null | undefined) => !!p)
            .join(' ')
            .trim();

          // --- Resolver parámetros con catálogos ---
          const sexoNombre = this.getNombreByIdParam(inv.sexo_param);
          const tipoInvestigador = this.getNombreByIdParam(inv.tipo_investigador_param);
          const institucion = this.getNombreInstitucionFromCatalogo(inv.id_institucion);
          const departamento = this.getNombreByIdParam(inv.departamento_param ?? inv.depto_param);
          const programaEducativo = this.getNombreByIdParam(inv.programa_educativo_param);
          const cuerpoAcademico = this.getNombreByIdParam(inv.cuerpo_academico_param);

          // Si quieres guardar solo M/F en el modelo:
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

    // 🔹 Extraer institución y usuario principal (si existen)
    const institucion =
      backendPatent.instituciones?.[0]?.nombre ||
      backendPatent.instituciones?.[0] ||
      backendPatent.institucion ||
      'N/A';

    const usuario =
      backendPatent.id_usuarios?.[0] ||
      backendPatent.id_usuario ||
      'N/A';

    const fec_solicitud_backend = backendPatent.fec_solicitud;
    const fec_expedicion_backend = backendPatent.fec_expedicion;

    const institucion_nombre =
      (backendPatent.institucion && typeof backendPatent.institucion === 'object'
        ? backendPatent.institucion.nombre
        : backendPatent.institucion) || '';

    // 👇 Antes de usar rama_nombre en el result
    let rama_nombre = '';

    if (backendPatent.rama_param) {
      if (typeof backendPatent.rama_param === 'object') {
        // Caso cuando ya viene como objeto de catálogo { id_param, nombre, ... }
        rama_nombre = backendPatent.rama_param.nombre || '';
      } else {
        // Caso como string o id (ej: "Programa de computación" o 3)
        const fromCatalog = this.getNombreByIdParam(backendPatent.rama_param);
        rama_nombre = fromCatalog || String(backendPatent.rama_param);
      }
    }

    const estatus_nombre =
      (backendPatent.estatus_param && typeof backendPatent.estatus_param === 'object'
        ? backendPatent.estatus_param.nombre
        : '') || 'En trámite';

    const medio_ingreso_nombre =
      (backendPatent.medio_ingreso_param && typeof backendPatent.medio_ingreso_param === 'object'
        ? backendPatent.medio_ingreso_param.nombre
        : '') || '';

    let tipo_sector_nombre =
      (backendPatent.tipo_sector_param && typeof backendPatent.tipo_sector_param === 'object'
        ? backendPatent.tipo_sector_param.nombre
        : '') || 'N/A';

    // Subsector actual (si viene ya resuelto), si no, lo deducimos
    let subsector_nombre =
      backendPatent.id_subsector_obj
        ? backendPatent.id_subsector_obj.nombre
        : backendPatent.id_subsector
          ? String(backendPatent.id_subsector)
          : 'N/A';

    if (backendPatent.id_subsector) {
      const chain = this.getSectorChainFromSubsector(backendPatent.id_subsector);

      // Solo sobreescribir si estaban vacíos/N/A
      if (!tipo_sector_nombre || tipo_sector_nombre === 'N/A') {
        tipo_sector_nombre = chain.tipoSector;
      }

      if (!backendPatent.sector || backendPatent.sector === '') {
        backendPatent.sector = chain.sector;
      }

      if (!subsector_nombre || subsector_nombre === 'N/A') {
        subsector_nombre = chain.subsector;
      }
    }

    const result: PatenteUIModel = {
      // ========================================
      // CAMPOS DE UI (los que declara IPatentModel)
      // ========================================
      id: backendPatent.id_registro,                                      // id de la patente en front
      solicitudId: backendPatent.no_expediente || '',                     // número de expediente
      nombrePatente: backendPatent.titulo || '',                          // título para la UI
      solicitante: usuario?.toString() || '',                             // puedes ajustar si tienes nombre real
      fechaSolicitud: fec_solicitud_backend
        ? fec_solicitud_backend.split('T')[0]
        : '',
      estatus: estatus_nombre as IPatentModel['estatus'],                 // 'Registrada', 'En trámite', etc.
      institucion: institucion_nombre || institucion || 'N/A',               // nombre de institución legible
      correo: backendPatent.correo || '',                                 // si viene del backend
      documentos: backendPatent.archivo ? [backendPatent.archivo] : [],   // array de archivos para la tabla

      // ========================================
      // CAMPOS DEL BACKEND (para redondez)
      // ========================================
      id_registro: backendPatent.id_registro,
      no_expediente: backendPatent.no_expediente,
      titulo: backendPatent.titulo,
      tipo_ingreso_param: backendPatent.tipo_ingreso_param,
      rama_param: rama_nombre,
      fec_expedicion: backendPatent.fec_expedicion,
      observaciones: backendPatent.observaciones,
      archivo: backendPatent.archivo,
      estatus_param: backendPatent.estatus_param,
      medio_ingreso_param: medio_ingreso_nombre,
      tipo_registro_param: backendPatent.tipo_registro_param,
      fec_solicitud: backendPatent.fec_solicitud,
      descripcion: backendPatent.descripcion || '',

      // ========================================
      // CAMPOS ADICIONALES PARA LA UI (detalle)
      // ========================================
      numeroExpediente: backendPatent.no_expediente || '',
      numeroTitulo: backendPatent.no_titulo || '',
      denominacion: backendPatent.titulo || '',
      fechaExpedicion: fec_expedicion_backend
        ? fec_expedicion_backend.split('T')[0]
        : '',
      tecnologicoOrigen: institucion || 'N/A',
      cePat: backendPatent.cepat || 'N/A',
      anioRenovacion: backendPatent.anio_renovacion
        ? String(backendPatent.anio_renovacion)
        : 'N/A',

      rama: rama_nombre,
      tipoSector: tipo_sector_nombre,
      sector: backendPatent.sector || '',
      subsector: subsector_nombre,

      // Inventores ya mapeados
      inventores,
    };

    return result;
  }

  public getPatent(id: number): Observable<PatenteUIModel> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`).pipe(
      map(patent => this.mapBackendToFrontend(patent))
    );
  }

  public createPatent(patent: IPatentModel): Observable<IPatentModel> {
    const backendData = this.mapFrontendToBackend(patent);
    return this.http.post<any>(this.apiUrl, backendData).pipe(
      map(response => this.mapBackendToFrontend(response))
    );
  }

  public updatePatent(id: number, patent: any): Observable<IPatentModel> {
    const backendData = this.mapFrontendToBackend(patent);
    return this.http.put<any>(`${this.apiUrl}/${id}/`, backendData).pipe(
      map(response => this.mapBackendToFrontend(response))
    );
  }

  public deletePatent(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/disable`, {});
  }

  private mapFrontendToBackend(patent: any): any {
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
        // Aquí NO ponemos la fecha actual, dejamos null
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

    const ramaParam = patent.rama_param != null
      ? String(patent.rama_param)
      : this.mapRamaToBackend(patent.rama);

    const medioIngresoParam = patent.medio_ingreso_param != null
      ? String(patent.medio_ingreso_param)
      : this.mapMedioIngresoToBackend(patent.medioIngreso);

    const tipoSectorParam = patent.tipo_sector_param != null
      ? String(patent.tipo_sector_param)
      : this.mapTipoSectorToBackend(patent.tipoSector);

    const estatusParam = patent.estatus_param != null
      ? String(patent.estatus_param)
      : this.mapEstatusToBackend(patent.estatus);

    const idSubsector = patent.id_subsector ?? null;

    // id_usuario: tomamos el solicitante del payload si viene
    const idUsuario = patent.solicitante
      ? parseInt(patent.solicitante, 10)
      : (patent.id_usuario || 0);

    // tipo_ingreso_param: si no viene, asumimos IMPI (ajusta según tu BD)
    const tipoIngresoParam = (() => {
      if (typeof patent.tipo_ingreso_param === 'number') return String(patent.tipo_ingreso_param);
      if (typeof patent.tipo_ingreso_param === 'string' && patent.tipo_ingreso_param.trim() !== '') {
        return patent.tipo_ingreso_param;
      }
      // Valor por defecto según parametrización (ej. 44 = IMPI)
      return '44';
    })();

    return {
      no_expediente: patent.no_expediente || patent.solicitudId || patent.numeroExpediente || '',
      titulo: patent.titulo || patent.denominacion || patent.nombrePatente || '',
      descripcion: patent.descripcion || '',
      tipo_ingreso_param: tipoIngresoParam,
      id_usuario: idUsuario,
      rama_param: ramaParam,
      fec_expedicion: formatDateOrNull(patent.fechaExpedicion || patent.fec_expedicion),
      observaciones: patent.observaciones || '',
      archivo: patent.archivo || (Array.isArray(patent.documentos) ? patent.documentos[0] : ''),
      estatus_param: estatusParam,
      medio_ingreso_param: medioIngresoParam,
      tipo_sector_param: tipoSectorParam,
      tipo_registro_param: this.TIPO_PATENTE,
      fec_solicitud: formatDate(patent.fechaSolicitud),
      tecnologico_origen: patent.tecnologicoOrigen || null,
      anio_renovacion: patent.anioRenovacion || null,
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
      // si tu parametrización tiene más, agrégalos aquí
    };

    const key = normalize(tipoSector);
    const direct = tipoSectorMap[key];

    if (direct) {
      return direct;
    }

    // Fallback: Terciario (ajusta si tu default debe ser otro)
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
      'marca': '178',              // id_param = 178
      'aviso comercial': '179',    // id_param = 179
      'diseño industrial': '180',  // id_param = 180
      'diseno industrial': '180',  // alias sin acento
      'modelo de utilidad': '181',
      'audiovisual': '8',                              // id_param = 8
      'copilación de datos (base de datos)': '9',      // id_param = 9
      'copilacion de datos (base de datos)': '9',
      'dibujo': '10',                                  // id_param = 10
      'isbn': '11',                                    // id_param = 11
      'issn': '12',                                    // id_param = 12
      'literaria': '13',                               // id_param = 13
      'literaria (arte digital por analogía)': '14',   // id_param = 14
      'literaria (arte digital por analogia)': '14',
      'programa de computación': '15',                 // id_param = 15
      'programa de computacion': '15',
      'programa de computación (app por analogía)': '16', // id_param = 16
      'programa de computacion (app por analogia)': '16',
      'reserva de derechos': '17',                     // id_param = 17
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
      'INDAUTOR': '38',                               // id_param = 38
      'ISBN': '39',                                   // id_param = 39
      'INDAINDAUTOR - CENTRO NACIONAL DE ISSN UTOR': '40', // id_param = 40 (texto tal como está en la BD)
      'VENTANILLA': '41',                             // id_param = 41
      'INDAUTOR - CENTRO NACIONAL DE ISSN': '42',     // id_param = 42
      'INDARELIN': '43',                              // id_param = 43

      // ----- Alias que tú usas en el front (opcional) -----
      // Asumo que "Cuenta Pase IMPI" y "EN LÍNEA" son medios en línea,
      // los mapeo al mismo id que "Indarelin" (43). Si en tu modelo
      // deberían ir a otro id_param, solo cambia estos valores.
      'CUENTA PASE IMPI': '43',
      'EN LÍNEA': '43',
      'EN LINEA': '43',

      // Si pones "N/A" en el front, lo mandamos a "VENTANILLA" como neutro
      'N/A': '1',
    };
    return medioMap[normalized] || '1';
  }

  private mapSectorToBackend(tipoSector: string): string {
    const sectorMap: { [key: string]: string } = {
      'Primario': '1',
      'Secundario': '2',
      'Terciario': '3',
      'Cuaternario': '4',
      'Quinario': '5',
      'N/A': '5'
    };
    return sectorMap[tipoSector] || '5';
  }

  private mapEstatusToBackend(estatus: string | null | undefined): string {
    // 1) Normalizamos a texto “seguro”
    const raw = (estatus || '').trim();
    const normalized = raw.toLowerCase();

    // 2) Mapa de texto (front) → id_param (tabla parametrizacion, id_tema = 7)
    const estatusMap: { [key: string]: string } = {
      // == Estados que manejas en el front ==
      'registrada': '34',                   // Notificada al Tecnológico
      'en trámite': '27',                   // Pendiente
      'en tramite': '27',
      'trámite con observaciones': '28',    // Con Observaciones
      'tramite con observaciones': '28',
      'aprobada': '26',                     // Confirmada
      'concluida': '30',                    // Finalizada

      // == Otros estados que también pueden venir desde el back/front ==
      'cancelada': '31',                    // Cancelada
      'en pausa': '32',                     // En pausa
      'en espera de validación': '33',      // En espera de validación
      'en espera de validacion': '33',

      // == Nombres tal cual aparecen en parametrizacion ==
      'confirmada': '26',
      'pendiente': '27',
      'con observaciones': '28',
      'rechazada': '29',
      'finalizada': '30',
      'notificada al tecnológico': '34',
      'notificada al tecnologico': '34'
    };

    // 3) Si no lo encontramos, devolvemos '27' (Pendiente) como estado neutro
    return estatusMap[normalized] || '27';
  }


  public updatePatentStatus(patentId: number, newStatus: IPatentModel['estatus']): Observable<any> {
    return this.updatePatent(patentId, { estatus: newStatus } as IPatentModel);
  }

  public updatePatentObservations(patentId: number, observations: string): Observable<any> {
    return this.updatePatent(patentId, { observaciones: observations } as IPatentModel);
  }

  public updatePatentStatusAndObservations(
    patentId: number,
    data: {
      estatus?: IPatentModel['estatus'],
      observaciones?: string
    }
  ): Observable<any> {
    return this.getPatent(patentId).pipe(
      switchMap(patent => {
        const updatedPatent = {
          ...patent,
          ...(data.estatus && { estatus: data.estatus }),
          ...(data.observaciones !== undefined && { observaciones: data.observaciones })
        };
        return this.updatePatent(patentId, updatedPatent);
      }),
      map(updatedPatent => ({
        success: true,
        message: 'Patente actualizada correctamente',
        patent: updatedPatent
      }))
    );
  }

  public getAllPatents(): Observable<IPatentModel[]> {
    return this.listPatents(1, 1000).pipe(
      map(response => response.results.map(p => this.mapBackendToFrontend(p)))
    );
  }


  public getPatentsStats(): Observable<any> {
    return this.getAllPatents().pipe(
      map(patents => ({
        total: patents.length,
        enTramite: patents.filter(p => p.estatus === 'En trámite').length,
        aprobadas: patents.filter(p => p.estatus === 'Aprobada').length,
        registradas: patents.filter(p => p.estatus === 'Registrada').length,
        concluidas: patents.filter(p => p.estatus === 'Concluida').length,
        conObservaciones: patents.filter(p => p.estatus === 'Trámite con observaciones').length
      }))
    );
  }
}