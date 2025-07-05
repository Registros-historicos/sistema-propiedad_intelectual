import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IModUtilModel } from '../models/mod-util.model';
import { modUtilData } from '../data/mod-util.data';

@Injectable({
  providedIn: 'root'
})
export class UtilityModelsService {
  private modUtiles: IModUtilModel[] = [...modUtilData];

  constructor() { }

  private convertDateFormat(dateStr: string): string {
    const converted = dateStr.split('-').reverse().join('-');
    return converted;
  }

  public getModUtiles(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    const orderColumn = tableParams.order?.[0]?.column || 0;
    const orderDir = tableParams.order?.[0]?.dir || 'asc';
    const columnName = tableParams.columns?.[orderColumn]?.data || 'id';

    let filteredModUtiles = this.modUtiles;

    if (searchValue) {
      filteredModUtiles = this.modUtiles.filter(modUtil => {
        const convertedDate = this.convertDateFormat(modUtil.fechaSolicitud);

        return modUtil.nombreModUtil.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.solicitudId.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.estatus.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue);
      });
    }

    const getUtilityModelValue = (utilityModel: IModUtilModel, column: string): string | number => {
      switch (column) {
        case 'solicitante':
          return utilityModel.solicitante || '';
        case 'nombreModUtil':
          return utilityModel.nombreModUtil || '';
        case 'institucion':
          return utilityModel.institucion || '';
        case 'fechaSolicitud':
          return new Date(utilityModel.fechaSolicitud).getTime();
        default:
          return utilityModel.id;
      }
    };

    filteredModUtiles.sort((a, b) => {
      const valueA = getUtilityModelValue(a, columnName);
      const valueB = getUtilityModelValue(b, columnName);

      if (orderDir === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    const total = filteredModUtiles.length;
    const paginatedModUtiles = filteredModUtiles.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: this.modUtiles.length,
          recordsFiltered: total,
          data: paginatedModUtiles
        });
        observer.complete();
      }, 500); // Simular delay de red
    });
  }

  /**
   * Obtener un modelo de utilidad por ID
   * @param id ID del modelo de utilidad
   */
  public getModUtil(id: number): Observable<IModUtilModel> {
    return new Observable(observer => {
      const fixId = Number(id);
      const modUtil = this.modUtiles.find(p => p.id === fixId);

      setTimeout(() => {
        if (modUtil) {
          observer.next(modUtil);
        } else {
          // Devolver objeto vacío si no se encuentra
          observer.next({
            id: 0,
            solicitudId: "",
            nombreModUtil: "",
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
   * Crear nuevo modelo de utilidad
   * @param modUtil Datos del modelo de utilidad
   */
  public createModUtil(modUtil: IModUtilModel): Observable<IModUtilModel> {
    return new Observable(observer => {
      // Generar nuevo ID
      modUtil.id = this.modUtiles.length > 0
        ? Math.max(...this.modUtiles.map(p => p.id)) + 1
        : 1;

      // Agregar al array local
      this.modUtiles.push(modUtil);

      setTimeout(() => {
        observer.next(modUtil);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar un modelo de utilidad completo
   * @param id ID del modelo de utilidad
   * @param modUtil Datos actualizados
   */
  public updateModUtil(id: number, modUtil: IModUtilModel): Observable<IModUtilModel> {
    return new Observable(observer => {
      const index = this.modUtiles.findIndex(p => p.id === id);

      if (index !== -1) {
        this.modUtiles[index] = { ...modUtil, id: id };
      }

      setTimeout(() => {
        observer.next(modUtil);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Eliminar un modelo de utilidad
   * @param id ID del modelo de utilidad
   */
  public deleteModUtil(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id);
      const index = this.modUtiles.findIndex(p => p.id === fixId);

      if (index !== -1) {
        this.modUtiles.splice(index, 1);
      }

      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500);
    });
  }

  // 🆕 MÉTODOS ESPECÍFICOS PARA ESTATUS Y OBSERVACIONES

  /**
   * Actualizar el estatus de un modelo de utilidad
   * @param modUtilId ID del modelo de utilidad
   * @param newStatus Nuevo estatus
   */
  public updateModUtilStatus(modUtilId: number, newStatus: IModUtilModel['estatus']): Observable<any> {
    return new Observable(observer => {
      const modUtil = this.modUtiles.find(p => p.id === modUtilId);

      if (modUtil) {
        modUtil.estatus = newStatus;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Estatus actualizado correctamente',
          modUtil: modUtil
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar las observaciones de un modelo de utilidad
   * @param modUtilId ID del modelo de utilidad
   * @param observations Observaciones del coordinador
   */
  public updateModUtilObservations(modUtilId: number, observations: string): Observable<any> {
    return new Observable(observer => {
      const modUtil = this.modUtiles.find(p => p.id === modUtilId);

      if (modUtil) {
        modUtil.observaciones = observations;
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Observaciones actualizadas correctamente',
          modUtil: modUtil
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Actualizar tanto estatus como observaciones en una sola operación
   * @param modUtilId ID del modelo de utilidad
   * @param data Objeto con estatus y observaciones
   */
  public updateModUtilStatusAndObservations(modUtilId: number, data: {
    estatus?: IModUtilModel['estatus'],
    observaciones?: string
  }): Observable<any> {
    return new Observable(observer => {
      const modUtil = this.modUtiles.find(p => p.id === modUtilId);

      if (modUtil) {
        if (data.estatus) {
          modUtil.estatus = data.estatus;
        }
        if (data.observaciones !== undefined) {
          modUtil.observaciones = data.observaciones;
        }
      }

      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Modelo de utilidad actualizado correctamente',
          modUtil: modUtil
        });
        observer.complete();
      }, 500);
    });
  }

  // 📊 MÉTODOS ADICIONALES DE UTILIDAD

  /**
   * Obtener todos los modelos de utilidad (sin paginación)
   */
  public getAllModUtiles(): Observable<IModUtilModel[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next([...this.modUtiles]);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Filtrar modelos de utilidad por estatus
   * @param status Estatus a filtrar
   */
  public getModUtilesByStatus(status: IModUtilModel['estatus']): Observable<IModUtilModel[]> {
    return new Observable(observer => {
      const filtered = this.modUtiles.filter(p => p.estatus === status);

      setTimeout(() => {
        observer.next(filtered);
        observer.complete();
      }, 300);
    });
  }

  /**
   * Obtener estadísticas de modelos de utilidad
   */
  public getModUtilesStats(): Observable<any> {
    return new Observable(observer => {
      const stats = {
        total: this.modUtiles.length,
        enTramite: this.modUtiles.filter(p => p.estatus === 'En trámite').length,
        aprobadas: this.modUtiles.filter(p => p.estatus === 'Aprobada').length,
        registradas: this.modUtiles.filter(p => p.estatus === 'Registrada').length,
        concluidas: this.modUtiles.filter(p => p.estatus === 'Concluida').length,
        conObservaciones: this.modUtiles.filter(p => p.estatus === 'Trámite con observaciones').length
      };

      setTimeout(() => {
        observer.next(stats);
        observer.complete();
      }, 300);
    });
  }
}
