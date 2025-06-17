import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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
    return converted
  }

  public getModUtiles(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredModUtiles = this.modUtiles;

    if (searchValue) {
      filteredModUtiles = this.modUtiles.filter(modUtil => {
        const convertedDate = this.convertDateFormat(modUtil.fechaSolicitud);
        
        return modUtil.nombreModUtil.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          modUtil.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue)
      });
    }

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
      }, 500);
    });
  }

  public getModUtil(id: number): Observable<IModUtilModel> {
    return new Observable(observer => {
      const fixId = Number(id)
      const modUtil = this.modUtiles.find(p => p.id === fixId);
      setTimeout(() => {
        if (modUtil) {
          observer.next(modUtil);
        } else {
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
            documentos: []
          });
        }
        observer.complete();
      }, 500);
    });
  }

  public createModUtil(modUtil: IModUtilModel): Observable<IModUtilModel> {
    return new Observable(observer => {
      modUtil.id = this.modUtiles.length + 1;
      this.modUtiles.push(modUtil);
      setTimeout(() => {
        observer.next(modUtil);
        observer.complete();
      }, 500);
    });
  }

  public updateModUtil(id: number, modUtil: IModUtilModel): Observable<IModUtilModel> {
    return new Observable(observer => {
      const index = this.modUtiles.findIndex(p => p.id === id);
      if (index !== -1) {
        this.modUtiles[index] = modUtil;
      }
      setTimeout(() => {
        observer.next(modUtil);
        observer.complete();
      }, 500);
    });
  }

  public deleteModUtil(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id)
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
}
