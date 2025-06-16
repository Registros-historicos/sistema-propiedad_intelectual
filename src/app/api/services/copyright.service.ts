import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIntelectualPropertyModel } from '../../pages/administrador/shared-services';
import { ICopyrightModel } from '../models/copyrigth.model';
import { COPYRIGHT_DATA } from '../data/copyright.data';

@Injectable({
  providedIn: 'root'
})
export class CopyrightsService {
  private copyrights: ICopyrightModel[] = [...COPYRIGHT_DATA];

  constructor() { }

  private convertDateFormat(dateStr: string): string {
    const converted = dateStr.split('-').reverse().join('-');
    return converted
  }

  public getCopyrights(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredCopyrights = this.copyrights;

    if (searchValue) {
      filteredCopyrights = this.copyrights.filter(copyright => {
        const convertedDate = this.convertDateFormat(copyright.fechaSolicitud);

        return copyright.nombreObra.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.autor.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          copyright.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue)
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
      }, 500);
    });
  }

  public getCopyright(id: number): Observable<ICopyrightModel> {
    return new Observable(observer => {
      const fixId = Number(id)
      const copyright = this.copyrights.find(c => c.id === fixId);
      setTimeout(() => {
        if (copyright) {
          observer.next(copyright);
        } else {
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
            documentos: []
          });
        }
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public createCopyright(copyright: ICopyrightModel): Observable<ICopyrightModel> {
    return new Observable(observer => {
      copyright.id = this.copyrights.length + 1;
      this.copyrights.push(copyright);
      setTimeout(() => {
        observer.next(copyright);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public updateCopyright(id: number, copyright: ICopyrightModel): Observable<ICopyrightModel> {
    return new Observable(observer => {
      const index = this.copyrights.findIndex(p => p.id === id);
      if (index !== -1) {
        this.copyrights[index] = copyright;
      }
      setTimeout(() => {
        observer.next(copyright);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public deleteCopyright(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id)
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
}
