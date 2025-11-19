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
    console.error('search: ' + searchValue)

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
          console.log('if')
          const safeSortColumn = (['no_expediente', 'id_registro', 'rama_param', 'titulo', 'fec_solicitud'].includes(sortColumn))
            ? sortColumn
            : 'fec_solicitud';
          return this.searchPatents(searchValue, page, limit, safeSortColumn, sortOrder);

        }
        console.log('else')
        return this.listPatents(page, limit, sortColumn, sortOrder);
      }),
      map((response) => {
        // 🔹 Ahora sí formatear con los catálogos ya cargados
        const formatted = this.formatForDataTables(response, tableParams.draw);
        console.log('✅ Catálogos aplicados, ejemplo de estatus:', formatted.data[0]?.estatus);
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

  private getSectorChainFromSubsector(idSubsector: any): {
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
        console.log('response')
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

        // 🔹 2. Lo imprimes para depuración
        console.log('Patente mapeada para DataTables:', uiPatent);

        // 🔹 3. Lo regresas para que el array `data` contenga objetos válidos
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

    const rama_nombre =
      backendPatent.rama_param ? backendPatent.rama_param.nombre
        : '';

    console.log(backendPatent.rama_param)

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

    console.log(backendPatent.id_subsector)

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

      tipoSector: tipo_sector_nombre,
      sector: backendPatent.sector || '',
      subsector: subsector_nombre,

      // Inventores ya mapeados
      inventores,
    };

    console.log(result)
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

  public updatePatent(id: number, patent: IPatentModel): Observable<IPatentModel> {
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

    return {
      no_expediente: patent.solicitudId || patent.numeroExpediente || '',
      titulo: patent.nombrePatente || patent.denominacion || '',
      descripcion: patent.descripcion || '',
      tipo_ingreso_param: '2',
      id_usuario: 1,
      rama_param: this.mapRamaToBackend(patent.rama || 'Invención'),
      medio_ingreso_param: this.mapMedioIngresoToBackend(patent.medioIngreso || 'Ventanilla'),
      tipo_sector_param: this.mapSectorToBackend(patent.tipoSector || 'Quinario'),
      tipo_registro_param: this.TIPO_PATENTE,
      estatus_param: this.mapEstatusToBackend(patent.estatus || 'En trámite'),
      fec_solicitud: formatDate(patent.fechaSolicitud),
      fec_expedicion: formatDate(patent.fechaExpedicion),
      archivo: patent.archivo || (patent.documentos?.[0]) || '',
      observaciones: patent.observaciones || 'Sin observaciones',
    };
  }

  private mapRamaToBackend(rama: string): string {
    const ramaMap: { [key: string]: string } = {
      'Invención': '1',
      'Modelo de utilidad': '2',
      'Diseño Industrial': '3',
      'Diseño industrial': '3',
      'Marca': '4'
    };
    return ramaMap[rama] || '1';
  }

  private mapMedioIngresoToBackend(medioIngreso: string): string {
    const medioMap: { [key: string]: string } = {
      'VENTANILLA': '1',
      'Indautor': '2',
      'Cuenta Pase IMPI': '3',
      'EN LÍNEA': '2',
      'N/A': '1'
    };
    return medioMap[medioIngreso] || '1';
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

  private mapEstatusToBackend(estatus: string): string {
    const estatusMap: { [key: string]: string } = {
      'Registrada': '1',
      'En trámite': '2',
      'Trámite con observaciones': '3',
      'Aprobada': '4',
      'Concluida': '5',
      'En espera de validación': '2'
    };
    return estatusMap[estatus] || '2';
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