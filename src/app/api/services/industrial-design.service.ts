import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIntelectualPropertyModel } from '../../pages/administrador/shared-services';
import { IDisIndModel } from '../models/dis-ind.model';
import { disIndData } from '../data/dis-ind.data';

@Injectable({
  providedIn: 'root'
})
export class IndustrialDesignsService {
  private industrialDesigns: IDisIndModel[] = [...disIndData];

  constructor() { }

  private convertDateFormat(dateStr: string): string {
    const converted = dateStr.split('-').reverse().join('-');
    return converted
  }

  public getIndustrialDesigns(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredDesigns = this.industrialDesigns;

    if (searchValue) {
      filteredDesigns = this.industrialDesigns.filter(design => {
        const convertedDate = this.convertDateFormat(design.fechaSolicitud);

        return design.nombreDisInd.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          design.institucion.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue)
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
      }, 500); // Simulate network delay
    });
  }

  public getIndustrialDesign(id: number): Observable<IDisIndModel> {
    return new Observable(observer => {
      const fixId = Number(id)
      const design = this.industrialDesigns.find(d => d.id === fixId);
      setTimeout(() => {
        if (design) {
          observer.next(design);
        } else {
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
            documentos: []
          });
        }
        observer.complete();
      }, 500);
    });
  }

  public createIndustrialDesign(design: IDisIndModel): Observable<IDisIndModel> {
    return new Observable(observer => {
      design.id = this.industrialDesigns.length + 1;
      this.industrialDesigns.push(design);
      setTimeout(() => {
        observer.next(design);
        observer.complete();
      }, 500);
    });
  }

  public updateIndustrialDesign(id: number, design: IDisIndModel): Observable<IDisIndModel> {
    return new Observable(observer => {
      const index = this.industrialDesigns.findIndex(d => d.id === id);
      if (index !== -1) {
        this.industrialDesigns[index] = design;
      }
      setTimeout(() => {
        observer.next(design);
        observer.complete();
      }, 500);
    });
  }

  public deleteIndustrialDesign(id: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(id)
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
}
