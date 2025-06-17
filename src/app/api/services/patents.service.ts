import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIntelectualPropertyModel } from '../../pages/administrador/shared-services';
import { PATENT_DATA } from '../data/patent.data';
import { IPatentModel } from '../models/patent.model';

@Injectable({
  providedIn: 'root'
})
export class PatentsService {

  private patents: IPatentModel[] = [...PATENT_DATA];

  constructor() { }

  private convertDateFormat(dateStr: string): string {
    const converted = dateStr.split('-').reverse().join('-');

    return converted
  }

  public getPatents(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredPatents = this.patents;

    if (searchValue) {

      filteredPatents = this.patents.filter(patent => {
        const convertedDate = this.convertDateFormat(patent.fechaSolicitud);
        
        return patent.nombrePatente.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue)
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
      }, 500);
    });
  }

  public getPatent(id: number): Observable<IPatentModel> {
    return new Observable(observer => {
      const fixId = Number(id)
      const patent = this.patents.find(p => p.id === fixId);
      setTimeout(() => {
        if (patent) {
          observer.next(patent);
        } else {
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
            documentos: []
          });
        }
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public createPatent(patent: IPatentModel): Observable<IPatentModel> {
    return new Observable(observer => {
      patent.id = this.patents.length + 1;
      this.patents.push(patent);
      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public updatePatent(id: number, patent: IPatentModel): Observable<IPatentModel> {
    return new Observable(observer => {
      const index = this.patents.findIndex(p => p.id === id);
      if (index !== -1) {
        this.patents[index] = patent;
      }
      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public deletePatent(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id)
      const index = this.patents.findIndex(p => p.id === fixId);
      
      if (index !== -1) {
        this.patents.splice(index, 1);
      }
      
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500); // Simulate network delay
    });
  }
}
