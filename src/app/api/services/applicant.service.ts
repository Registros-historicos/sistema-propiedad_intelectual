import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAplicantModel } from '../models/applicant.model';
import { APPLICANTS_REQUEST_DATA } from '../data/applicant.data';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService {
  private applicants: IAplicantModel[] = [...APPLICANTS_REQUEST_DATA];

  constructor() { }

  private convertDateFormat(dateStr: string): string {
    const converted = dateStr.split('-').reverse().join('-');
    return converted;
  }

  public getApplicants(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    const orderColumn = tableParams.order?.[0]?.column || 0;
    const orderDir = tableParams.order?.[0]?.dir || 'asc';
    const columnName = tableParams.columns?.[orderColumn]?.data || 'id';

    let filteredApplicants = this.applicants;

    if (searchValue) {
      filteredApplicants = this.applicants.filter((applicant) => {
        const convertedDate = this.convertDateFormat(applicant.fechaSolicitud);

        return (
          applicant.titulo.toLowerCase().includes(searchValue.toLowerCase()) ||
          applicant.solicitante
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          applicant.autor.toLowerCase().includes(searchValue.toLowerCase()) ||
          applicant.correo.toLowerCase().includes(searchValue.toLowerCase()) ||
          applicant.institucion
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          convertedDate.includes(searchValue)
        );
      });
    }

    const getApplicantValue = (applicant: IAplicantModel, column: string): string | number => {
      switch (column) {
        case 'nombre':
          return applicant.solicitante || '';
        case 'entidad_federativa':
          return applicant.estado || '';
        case 'institucion_adscripcion':
          return applicant.institucion || '';
        case 'created_at':
          return new Date(applicant.fechaSolicitud).getTime();
        default:
          return applicant.id;
      }
    };

    filteredApplicants.sort((a, b) => {
      const valueA = getApplicantValue(a, columnName);
      const valueB = getApplicantValue(b, columnName);

      if (orderDir === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    const total = filteredApplicants.length;
    const paginatedApplicants = filteredApplicants.slice(start, start + length);

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: this.applicants.length,
          recordsFiltered: total,
          data: paginatedApplicants,
        });
        observer.complete();
      }, 500);
    });
  }

  public getApplicant(id: number): Observable<IAplicantModel> {
    return new Observable((observer) => {
      const fixId = Number(id);
      const applicant = this.applicants.find((a) => a.id === fixId);
      setTimeout(() => {
        if (applicant) {
          observer.next(applicant);
        } else {
          observer.next({
            id: 0,
            titulo: '',
            solicitante: '',
            autor: '',
            fechaSolicitud: '',
            estado: 'En trámite',
            descripcion: '',
            institucion: '',
            correo: '',
            documentos: [],
          });
        }
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public createApplicant(
    applicant: IAplicantModel
  ): Observable<IAplicantModel> {
    return new Observable((observer) => {
      applicant.id = this.applicants.length + 1;
      this.applicants.push(applicant);
      setTimeout(() => {
        observer.next(applicant);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public updateApplicant(
    id: number,
    applicant: IAplicantModel
  ): Observable<IAplicantModel> {
    return new Observable((observer) => {
      const index = this.applicants.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.applicants[index] = applicant;
      }
      setTimeout(() => {
        observer.next(applicant);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public deleteApplicant(id: number): Observable<void> {
    return new Observable((observer) => {
      const fixId = Number(id);
      const index = this.applicants.findIndex((a) => a.id === fixId);

      if (index !== -1) {
        this.applicants.splice(index, 1);
      }

      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500);
    });
  }
}
