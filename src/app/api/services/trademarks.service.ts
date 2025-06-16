import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatosMarca } from '../models/marca.model';
import { MARK_DATA } from '../data/marca.data';

@Injectable({
  providedIn: 'root'
})
export class TrademarksService {
  private trademarks: DatosMarca[] = [...MARK_DATA];

  private convertDateFormat(dateStr: string): string {
    const converted = dateStr.split('/').join('-');

    return converted
  }

  public getTrademarks(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    let filteredTrademarks = this.trademarks;

    if (searchValue) {

      filteredTrademarks = this.trademarks.filter(patent => {
        const convertedDate = this.convertDateFormat(patent.fechaPresentacion);

        return patent.denominacion.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.tipoSolicitud.toLowerCase().includes(searchValue.toLowerCase()) ||
          patent.titular.toLowerCase().includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue)
      });
    }

    const total = filteredTrademarks.length;
    const paginatedTrademarks = filteredTrademarks.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: this.trademarks.length,
          recordsFiltered: total,
          data: paginatedTrademarks
        });
        observer.complete();
      }, 300);
    });
  }

  public create(trademark: DatosMarca): Observable<DatosMarca> {
    return new Observable(observer => {
      trademark.registro = this.trademarks.length + 1;
      this.trademarks.push(trademark);
      setTimeout(() => {
        observer.next(trademark);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public getTrademark(id: number): Observable<DatosMarca> {
    return new Observable(observer => {
      const fixId = Number(id)
      const marca = this.trademarks.find(p => p.registro === fixId);
      setTimeout(() => {
        if (marca) {
          observer.next(marca);
        } else {
          observer.next({
            denominacion: '',
            fechaPresentacion: '',
            tipoSolicitud: '',
            marca: '',
            productosServicios: [],
            titular: ''
          })
        }
        observer.complete();
      }, 300);
    });
  }

  public updateTrademark(registro: number, updated: DatosMarca): Observable<DatosMarca> {
    const index = this.trademarks.findIndex(m => m.registro === registro);
    if (index !== -1) {
      this.trademarks[index] = updated;
    }
    return of(updated);
  }

  public createTrademark(marca: DatosMarca): Observable<DatosMarca> {
    this.trademarks.push(marca);
    return of(marca);
  }

  public deleteTrademark(registro: number): Observable<void> {
    return new Observable(observer => {
      const fixId = Number(registro)
      const index = this.trademarks.findIndex(m => m.registro === fixId);

      if (index !== -1) {
        this.trademarks.splice(index, 1);
      }

      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500);
    })
  }
}
