import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIntelectualPropertyModel } from '../../pages/administrador/shared-services';
import { ICopyrightModel } from '../models/copyrigth.model';
import { COPYRIGHT_DATA } from '../data/copyright.data';

@Injectable({
  providedIn: 'root'
})
export class CopyrightsService {
  private copyrights: ICopyrightModel[] = [...COPYRIGHT_DATA]; // 📊 Trabajar con datos locales

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
   * Obtener derechos de autor con paginación y búsqueda (para DataTable)
   * @param tableParams Parámetros de la tabla
   */
  public getCopyrights(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredCopyrights = this.copyrights;

    // 🔍 Aplicar filtro de búsqueda si existe
    if (searchValue) {
      filteredCopyrights = this.copyrights.filter(copyright => {
        const convertedDate = this.convertDateFormat(copyright.fechaSolicitud);

        return copyright.nombreObra.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.autor.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.solicitudId.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.estado.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue);
      });
    }

    const total = filteredCopyrights.length;
    const paginatedCopyrights = filteredCopyrights.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: this.copyrights.length,
          recordsFiltered: total,
          data: paginatedCopyrights
        });
        observer.complete();
      }, 500); // Simular delay de red
    });
  }

  /**
   * Obtener un derecho de autor por ID
   * @param id ID del derecho de autor
   */
  public getCopyright(id: number): Observable<ICopyrightModel> {
    return new Observable(observer => {
      const fixId = Number(id);
      const copyright = this.copyrights.find(c => c.id === fixId);

      setTimeout(() => {
        if (copyright) {
          observer.next(copyright);
        } else {
          // Devolver objeto vacío si no se encuentra
          observer.next({
            id: 0,
            solicitudId: "",
            nombreObra: "",
            solicitante: "",
            autor: "",
            fechaSolicitud: "",
            estado: "En trámite",
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
   * Crear nuevo derecho de autor
   * @param copyright Datos del derecho de autor
   */
  public createCopyright(copyright: ICopyrightModel): Observable<ICopyrightModel> {
    return new Observable(observer => {
      // Generar nuevo ID
      copyright.id = this.copyrights.length > 0
        ? Math.max(...this.copyrights.map(c => c.id)) + 1
        : 1;

      // Agregar al array local
      this.copyrights.push(copyright);

      setTimeout(() => {
        observer.next(copyright);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar un derecho de autor completo
   * @param id ID del derecho de autor
   * @param copyright Datos actualizados
   */
  public updateCopyright(id: number, copyright: ICopyrightModel): Observable<ICopyrightModel> {
    return new Observable(observer => {
      const index = this.copyrights.findIndex(c => c.id === id);

      if (index !== -1) {
        this.copyrights[index] = { ...copyright, id: id };
      }

      setTimeout(() => {
        observer.next(copyright);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Eliminar un derecho de autor
   * @param id ID del derecho de autor
   */
  public deleteCopyright(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id);
      const index = this.copyrights.findIndex(c => c.id === fixId);

      if (index !== -1) {
        this.copyrights.splice(index, 1);
      }

      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500);
    });
  }

  // 🆕 MÉTODOS ESPECÍFICOS PARA ESTADO Y OBSERVACIONES

  /**
   * Actualizar el estado de un derecho de autor
   * @param copyrightId ID del derecho de autor
   * @param newStatus Nuevo estado
   */
  public updateCopyrightStatus(copyrightId: number, newStatus: ICopyrightModel['estado']): Observable<any> {
    return new Observable(observer => {
      const copyright = this.copyrights.find(c => c.id === copyrightId);

      if (copyright) {
        copyright.estado = newStatus;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Estado actualizado correctamente',
          copyright: copyright
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar las observaciones de un derecho de autor
   * @param copyrightId ID del derecho de autor
   * @param observations Observaciones del coordinador
   */
  public updateCopyrightObservations(copyrightId: number, observations: string): Observable<any> {
    return new Observable(observer => {
      const copyright = this.copyrights.find(c => c.id === copyrightId);

      if (copyright) {
        copyright.observaciones = observations;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Observaciones actualizadas correctamente',
          copyright: copyright
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar tanto estado como observaciones en una sola operación
   * @param copyrightId ID del derecho de autor
   * @param data Objeto con estado y observaciones
   */
  public updateCopyrightStatusAndObservations(copyrightId: number, data: {
    estado?: ICopyrightModel['estado'],
    observaciones?: string
  }): Observable<any> {
    return new Observable(observer => {
      const copyright = this.copyrights.find(c => c.id === copyrightId);

      if (copyright) {
        if (data.estado) {
          copyright.estado = data.estado;
        }
        if (data.observaciones !== undefined) {
          copyright.observaciones = data.observaciones;
        }
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Derecho de autor actualizado correctamente',
          copyright: copyright
        });
        observer.complete();
      }, 500);
    });
  }

  // 📊 MÉTODOS ADICIONALES DE UTILIDAD

  /**
   * Obtener todos los derechos de autor (sin paginación)
   */
  public getAllCopyrights(): Observable<ICopyrightModel[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next([...this.copyrights]);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Filtrar derechos de autor por estado
   * @param status Estado a filtrar
   */
  public getCopyrightsByStatus(status: ICopyrightModel['estado']): Observable<ICopyrightModel[]> {
    return new Observable(observer => {
      const filtered = this.copyrights.filter(c => c.estado === status);

      setTimeout(() => {
        observer.next(filtered);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Obtener estadísticas de derechos de autor
   */
  public getCopyrightsStats(): Observable<any> {
    return new Observable(observer => {
      const stats = {
        total: this.copyrights.length,
        enTramite: this.copyrights.filter(c => c.estado === 'En trámite').length,
        aprobadas: this.copyrights.filter(c => c.estado === 'Aprobada').length,
        registradas: this.copyrights.filter(c => c.estado === 'Registrada').length,
        concluidas: this.copyrights.filter(c => c.estado === 'Concluida').length,
        conObservaciones: this.copyrights.filter(c => c.estado === 'Trámite con observaciones').length
      };

      setTimeout(() => {
        observer.next(stats);
        observer.complete();
      }, 300);
    });
  }
}
