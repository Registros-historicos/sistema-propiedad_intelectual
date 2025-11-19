import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IPatentModel } from '../models/patent.model';
import { Catalogos, ParametrizacionesService } from './parametrizaciones.service';

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
      data: (response.results || []).map(patent => this.mapBackendToFrontend(patent))
    };
    return formattedData;
  }


private mapBackendToFrontend(backendPatent: any): IPatentModel {
  // 🔹 Si ya tienes catálogos cargados, convertir numéricos a objetos legibles
  if (this.catalogos) {
    backendPatent = this.paramService.convertirRegistroConObjetos(backendPatent, this.catalogos);
  }

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

  return {
    id: backendPatent.id_registro || 0,
    solicitudId: backendPatent.no_expediente?.toString() || 'N/A',
    nombrePatente: backendPatent.titulo || 'Sin título',
    solicitante: usuario || 'TecNM',
    institucion,
    correo: backendPatent.correo || 'N/A',

    fechaSolicitud: backendPatent.fec_solicitud
      ? backendPatent.fec_solicitud.split('T')[0]
      : '',

    estatus:
      typeof backendPatent.estatus_param === 'object'
        ? backendPatent.estatus_param?.nombre
        : backendPatent.estatus_param?.toString() || 'N/A',

    descripcion: backendPatent.descripcion || '',
    documentos: backendPatent.archivo ? [backendPatent.archivo] : [],
    observaciones: backendPatent.observaciones || '',

    rama:
      typeof backendPatent.rama_param === 'object'
        ? backendPatent.rama_param?.nombre
        : backendPatent.rama_param?.toString() || 'N/A',

    numeroExpediente: backendPatent.no_expediente?.toString() || 'N/A',
    numeroTitulo: backendPatent.id_registro?.toString() || 'N/A',
    denominacion: backendPatent.titulo || 'Sin título',

    medioIngreso:
      typeof backendPatent.medio_ingreso_param === 'object'
        ? backendPatent.medio_ingreso_param?.nombre
        : backendPatent.medio_ingreso_param?.toString() || 'N/A',

    tipoSector:
      typeof backendPatent.tipo_sector_param === 'object'
        ? backendPatent.tipo_sector_param?.nombre
        : backendPatent.tipo_sector_param?.toString() || 'N/A',

    tecnologicoOrigen: institucion,
    cePat: 'N/A',
    anioRenovacion: 'N/A',
    sector: 'N/A',
    subsector: 'N/A',

    fechaExpedicion: backendPatent.fec_expedicion
      ? backendPatent.fec_expedicion.split('T')[0]
      : 'Pendiente',

    archivo: backendPatent.archivo || '',

    tipoIngreso:
      typeof backendPatent.tipo_ingreso_param === 'object'
        ? backendPatent.tipo_ingreso_param?.nombre
        : backendPatent.tipo_ingreso_param?.toString() || 'IMPI',

    tipoRegistro:
      typeof backendPatent.tipo_registro_param === 'object'
        ? backendPatent.tipo_registro_param?.nombre
        : backendPatent.tipo_registro_param?.toString() || 'IMPI',
  } as any;
}
  public getPatent(id: number): Observable<IPatentModel> {
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