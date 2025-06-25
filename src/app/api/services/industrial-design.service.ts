import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIntelectualPropertyModel } from '../../pages/administrador/shared-services';
import { IDisIndModel } from '../models/dis-ind.model';
import { disIndData } from '../data/dis-ind.data';

@Injectable({
  providedIn: 'root'
})
export class IndustrialDesignsService {
  private industrialDesigns: IDisIndModel[] = [...disIndData]; // 📊 Trabajar con datos locales

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
   * Obtener diseños industriales con paginación y búsqueda (para DataTable)
   * @param tableParams Parámetros de la tabla
   */
  public getIndustrialDesigns(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredDesigns = this.industrialDesigns;

    // 🔍 Aplicar filtro de búsqueda si existe
    if (searchValue) {
      filteredDesigns = this.industrialDesigns.filter(design => {
        const convertedDate = this.convertDateFormat(design.fechaSolicitud);

        return design.nombreDisInd.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.solicitudId.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.estatus.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue);
      });
    }

    const total = filteredDesigns.length;
    const paginatedDesigns = filteredDesigns.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: this.industrialDesigns.length,
          recordsFiltered: total,
          data: paginatedDesigns
        });
        observer.complete();
      }, 500); // Simular delay de red
    });
  }

  /**
   * Obtener un diseño industrial por ID
   * @param id ID del diseño industrial
   */
  public getIndustrialDesign(id: number): Observable<IDisIndModel> {
    return new Observable(observer => {
      const fixId = Number(id);
      const design = this.industrialDesigns.find(d => d.id === fixId);

      setTimeout(() => {
        if (design) {
          observer.next(design);
        } else {
          // Devolver objeto vacío si no se encuentra
          observer.next({
            id: 0,
            solicitudId: "",
            nombreDisInd: "",
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
   * Crear nuevo diseño industrial
   * @param design Datos del diseño industrial
   */
  public createIndustrialDesign(design: IDisIndModel): Observable<IDisIndModel> {
    return new Observable(observer => {
      // Generar nuevo ID
      design.id = this.industrialDesigns.length > 0
        ? Math.max(...this.industrialDesigns.map(d => d.id)) + 1
        : 1;

      // Agregar al array local
      this.industrialDesigns.push(design);

      setTimeout(() => {
        observer.next(design);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar un diseño industrial completo
   * @param id ID del diseño industrial
   * @param design Datos actualizados
   */
  public updateIndustrialDesign(id: number, design: IDisIndModel): Observable<IDisIndModel> {
    return new Observable(observer => {
      const index = this.industrialDesigns.findIndex(d => d.id === id);

      if (index !== -1) {
        this.industrialDesigns[index] = { ...design, id: id };
      }

      setTimeout(() => {
        observer.next(design);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Eliminar un diseño industrial
   * @param id ID del diseño industrial
   */
  public deleteIndustrialDesign(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id);
      const index = this.industrialDesigns.findIndex(d => d.id === fixId);

      if (index !== -1) {
        this.industrialDesigns.splice(index, 1);
      }

      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500);
    });
  }

  // 🆕 MÉTODOS ESPECÍFICOS PARA ESTATUS Y OBSERVACIONES

  /**
   * Actualizar el estatus de un diseño industrial
   * @param designId ID del diseño industrial
   * @param newStatus Nuevo estatus
   */
  public updateIndustrialDesignStatus(designId: number, newStatus: IDisIndModel['estatus']): Observable<any> {
    return new Observable(observer => {
      const design = this.industrialDesigns.find(d => d.id === designId);

      if (design) {
        design.estatus = newStatus;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Estatus actualizado correctamente',
          design: design
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar las observaciones de un diseño industrial
   * @param designId ID del diseño industrial
   * @param observations Observaciones del coordinador
   */
  public updateIndustrialDesignObservations(designId: number, observations: string): Observable<any> {
    return new Observable(observer => {
      const design = this.industrialDesigns.find(d => d.id === designId);

      if (design) {
        design.observaciones = observations;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Observaciones actualizadas correctamente',
          design: design
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar tanto estatus como observaciones en una sola operación
   * @param designId ID del diseño industrial
   * @param data Objeto con estatus y observaciones
   */
  public updateIndustrialDesignStatusAndObservations(designId: number, data: {
    estatus?: IDisIndModel['estatus'],
    observaciones?: string
  }): Observable<any> {
    return new Observable(observer => {
      const design = this.industrialDesigns.find(d => d.id === designId);

      if (design) {
        if (data.estatus) {
          design.estatus = data.estatus;
        }
        if (data.observaciones !== undefined) {
          design.observaciones = data.observaciones;
        }
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Diseño industrial actualizado correctamente',
          design: design
        });
        observer.complete();
      }, 500);
    });
  }

  // 📊 MÉTODOS ADICIONALES DE UTILIDAD

  /**
   * Obtener todos los diseños industriales (sin paginación)
   */
  public getAllIndustrialDesigns(): Observable<IDisIndModel[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next([...this.industrialDesigns]);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Filtrar diseños industriales por estatus
   * @param status Estatus a filtrar
   */
  public getIndustrialDesignsByStatus(status: IDisIndModel['estatus']): Observable<IDisIndModel[]> {
    return new Observable(observer => {
      const filtered = this.industrialDesigns.filter(d => d.estatus === status);

      setTimeout(() => {
        observer.next(filtered);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Obtener estadísticas de diseños industriales
   */
  public getIndustrialDesignsStats(): Observable<any> {
    return new Observable(observer => {
      const stats = {
        total: this.industrialDesigns.length,
        enTramite: this.industrialDesigns.filter(d => d.estatus === 'En trámite').length,
        aprobadas: this.industrialDesigns.filter(d => d.estatus === 'Aprobada').length,
        registradas: this.industrialDesigns.filter(d => d.estatus === 'Registrada').length,
        concluidas: this.industrialDesigns.filter(d => d.estatus === 'Concluida').length,
        conObservaciones: this.industrialDesigns.filter(d => d.estatus === 'Trámite con observaciones').length
      };

      setTimeout(() => {
        observer.next(stats);
        observer.complete();
      }, 300);
    });
  }
}
