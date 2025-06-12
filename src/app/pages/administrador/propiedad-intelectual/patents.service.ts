import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IIntelectualPropertyModel} from '../shared-services';
import { PATENT_DATA } from 'src/app/api/data/patent.data';

@Injectable({
  providedIn: 'root'
})
export class PatentsService {
  private patents: any[] = [];

  constructor() {
    this.patents = this.mapPatentData();
  }

  private mapPatentData() {
    return PATENT_DATA.map(patent => {
      const nombreCompleto = patent.solicitante.split(' ');
      const nombre = nombreCompleto[0] || '';
      const apellidos = nombreCompleto.slice(1).join(' ') || '';

      return {
        id: patent.id,
        titulo: patent.nombrePatente,
        descripcion: patent.descripcion,
        fecha_presentacion: patent.fechaSolicitud,
        numero_solicitud: patent.solicitudId,
        institucion_adscripcion: patent.institucion,
        solicitante_nombre: nombre,
        solicitante_apellidos: apellidos,
        solicitante_email: patent.email,
        solicitante_telefono: '',
        estado: patent.estado,
        tipo_propiedad: patent.tipoPropiedad,
        inventor: patent.inventor,
        documentos: patent.documentos
      };
    });
  }

  public getPatents(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const total = this.patents.length;

    // Simulate server-side pagination
    const paginatedPatents = this.patents.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: total,
          recordsFiltered: total,
          data: paginatedPatents
        });
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public getPatent(id: number): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      const patent = this.patents.find(p => p.id === id);
      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public createPatent(patent: IIntelectualPropertyModel): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      patent.id = this.patents.length + 1;
      this.patents.push(patent);
      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public updatePatent(id: number, patent: IIntelectualPropertyModel): Observable<IIntelectualPropertyModel> {
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
      const index = this.patents.findIndex(p => p.id === id);
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
