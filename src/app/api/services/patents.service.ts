import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatentModel } from '../models/patent.model';
import { PATENT_DATA } from '../data/patent.data'; // 📁 Importar los datos locales

@Injectable({
  providedIn: 'root'
})
export class PatentsService {
  private patents: IPatentModel[] = [...PATENT_DATA]; // 📊 Trabajar con datos locales

  constructor() { }

  /**
   * Convertir formato de fecha para búsquedas
   * @param dateStr Fecha en formato YYYY-MM-DD
   * @returns Fecha en formato DD-MM-YYYY
   */
  private convertDateFormat(dateStr: string): string {
    const converted = dateStr.split('-').reverse().join('-');
    return converted;
  }

  /**
   * Obtener patentes con paginación y búsqueda (para DataTable)
   * @param tableParams Parámetros de la tabla
   */
  public getPatents(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredPatents = this.patents;

    // 🔍 Aplicar filtro de búsqueda si existe
    if (searchValue) {
      filteredPatents = this.patents.filter(patent => {
        const convertedDate = this.convertDateFormat(patent.fechaSolicitud);

        return patent.nombrePatente.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.solicitudId.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.estatus.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue);
      });
    }

    const total = filteredPatents.length;
    const paginatedPatents = filteredPatents.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: this.patents.length,
          recordsFiltered: total,
          data: paginatedPatents
        });
        observer.complete();
      }, 500); // Simular delay de red
    });
  }

  /**
   * Obtener una patente por ID
   * @param id ID de la patente
   */
  public getPatent(id: number): Observable<IPatentModel> {
    return new Observable(observer => {
      const fixId = Number(id);
      const patent = this.patents.find(p => p.id === fixId);

      setTimeout(() => {
        if (patent) {
          observer.next(patent);
        } else {
          // Devolver objeto vacío si no se encuentra
          observer.next({
            id: 0,
            solicitudId: "",
            nombrePatente: "",
            solicitante: "",
            fechaSolicitud: "",
            estatus: "En trámite",
            descripcion: "",
            institucion: "",
            correo: "",
            documentos: [],
            observaciones: ""
          });
        }
        observer.complete();
      }, 500);
    });
  }

  /**
   * Crear nueva patente
   * @param patent Datos de la patente
   */
  public createPatent(patent: IPatentModel): Observable<IPatentModel> {
    return new Observable(observer => {
      // Generar nuevo ID
      patent.id = this.patents.length > 0
        ? Math.max(...this.patents.map(p => p.id)) + 1
        : 1;

      // Agregar al array local
      this.patents.push(patent);

      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar una patente completa
   * @param id ID de la patente
   * @param patent Datos actualizados
   */
  public updatePatent(id: number, patent: IPatentModel): Observable<IPatentModel> {
    return new Observable(observer => {
      const index = this.patents.findIndex(p => p.id === id);

      if (index !== -1) {
        this.patents[index] = { ...patent, id: id };
      }

      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Eliminar una patente
   * @param id ID de la patente
   */
  public deletePatent(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id);
      const index = this.patents.findIndex(p => p.id === fixId);

      if (index !== -1) {
        this.patents.splice(index, 1);
      }

      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500);
    });
  }

  // 🆕 MÉTODOS ESPECÍFICOS PARA ESTATUS Y OBSERVACIONES

  /**
   * Actualizar el estatus de una patente
   * @param patentId ID de la patente
   * @param newStatus Nuevo estatus
   */
  public updatePatentStatus(patentId: number, newStatus: IPatentModel['estatus']): Observable<any> {
    return new Observable(observer => {
      const patent = this.patents.find(p => p.id === patentId);

      if (patent) {
        patent.estatus = newStatus;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Estatus actualizado correctamente',
          patent: patent
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar las observaciones de una patente
   * @param patentId ID de la patente
   * @param observations Observaciones del coordinador
   */
  public updatePatentObservations(patentId: number, observations: string): Observable<any> {
    return new Observable(observer => {
      const patent = this.patents.find(p => p.id === patentId);

      if (patent) {
        patent.observaciones = observations;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Observaciones actualizadas correctamente',
          patent: patent
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar tanto estatus como observaciones en una sola operación
   * @param patentId ID de la patente
   * @param data Objeto con estatus y observaciones
   */
  public updatePatentStatusAndObservations(patentId: number, data: {
    estatus?: IPatentModel['estatus'],
    observaciones?: string
  }): Observable<any> {
    return new Observable(observer => {
      const patent = this.patents.find(p => p.id === patentId);

      if (patent) {
        if (data.estatus) {
          patent.estatus = data.estatus;
        }
        if (data.observaciones !== undefined) {
          patent.observaciones = data.observaciones;
        }
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Patente actualizada correctamente',
          patent: patent
        });
        observer.complete();
      }, 500);
    });
  }

  // 📊 MÉTODOS ADICIONALES DE UTILIDAD

  /**
   * Obtener todas las patentes (sin paginación)
   */
  public getAllPatents(): Observable<IPatentModel[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next([...this.patents]);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Filtrar patentes por estatus
   * @param status Estatus a filtrar
   */
  public getPatentsByStatus(status: IPatentModel['estatus']): Observable<IPatentModel[]> {
    return new Observable(observer => {
      const filtered = this.patents.filter(p => p.estatus === status);

      setTimeout(() => {
        observer.next(filtered);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Obtener estadísticas de patentes
   */
  public getPatentsStats(): Observable<any> {
    return new Observable(observer => {
      const stats = {
        total: this.patents.length,
        enTramite: this.patents.filter(p => p.estatus === 'En trámite').length,
        aprobadas: this.patents.filter(p => p.estatus === 'Aprobada').length,
        registradas: this.patents.filter(p => p.estatus === 'Registrada').length,
        concluidas: this.patents.filter(p => p.estatus === 'Concluida').length,
        conObservaciones: this.patents.filter(p => p.estatus === 'Trámite con observaciones').length
      };

      setTimeout(() => {
        observer.next(stats);
        observer.complete();
      }, 300);
    });
  }
}
