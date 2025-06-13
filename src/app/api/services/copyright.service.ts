import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IIntelectualPropertyModel} from '../../pages/administrador/shared-services';

@Injectable({
  providedIn: 'root'
})
export class CopyrightsService {
  private mockTitles: string[] = [
    'Vacuna SARS-CoV-2',
    'Software de gestión de datos',
    'Dispositivo de monitoreo de salud',
    'Método de purificación de agua',
    'Sistema de energía solar eficiente',
    'Tecnología de almacenamiento de energía',
    'Dispositivo de comunicación cuántica',
    'Método de detección temprana de enfermedades',
    'Sistema de transporte autónomo',
    'Dispositivo de realidad aumentada',
    'Método de análisis de big data',
    'Sistema de control de calidad',
    'Dispositivo de inteligencia artificial',
    'Método de generación de energía renovable',
    'Sistema de gestión de recursos',
    'Dispositivo de monitoreo de calidad del aire',
    'Método de detección de plagas',
    'Sistema de transporte de carga',
    'Dispositivo de control de temperatura',
    'Método de análisis de datos de sensores',
    'Sistema de gestión de inventarios'
    // Agrega más títulos aquí
  ];

  private mockDescriptions: string[] = [
    'Una vacuna para el virus SARS-CoV-2',
    'Un software para la gestión de datos',
    'Un dispositivo para el monitoreo de salud',
    'Un método para la purificación de agua',
    'Un sistema para la energía solar eficiente',
    'Un dispositivo para el almacenamiento de energía',
    'Un dispositivo para la comunicación cuántica',
    'Un método para la detección temprana de enfermedades',
    'Un sistema para el transporte autónomo',
    'Un dispositivo para la realidad aumentada',
    'Un método para el análisis de big data',
    'Un sistema para el control de calidad',
    'Un dispositivo para la inteligencia artificial',
    'Un método para la generación de energía renovable',
    'Un sistema para el gestión de recursos',
    'Un dispositivo para el monitoreo de calidad del aire',
    'Un método para la detección de plagas',
    'Un sistema para el transporte de carga',
    'Un dispositivo para el control de temperatura',
    'Un método para el análisis de datos de sensores',
    'Un sistema para el gestión de inventarios'
    // Agrega más descripciones aquí
  ];

  private mockInstitutions: string[] = [
    'Universidad Nacional Autónoma de México',
    'Instituto Politécnico Nacional',
    'Centro de Investigación y de Estudios Avanzados',
    'Universidad de Guadalajara',
    'Universidad Autónoma Metropolitana',
    'Universidad Autónoma de Nuevo León',
    'Universidad de las Américas Puebla',
    'Tecnológico de Monterrey',
    'Universidad Iberoamericana',
    'Universidad Anáhuac'
  ];

  private mockNames: string[] = [
    'Jorge',
    'Ana',
    'Carlos',
    'María',
    'Luis',
    'Sofía',
    'Pedro',
    'Laura',
    'Diego',
    'Elena'
    // Agrega más nombres aquí
  ];

  private mockLastNames: string[] = [
    'García',
    'Martínez',
    'López',
    'Hernández',
    'González',
    'Rodríguez',
    'Pérez',
    'Sánchez',
    'Ramírez',
    'Torres'
    // Agrega más apellidos aquí
  ];

  private mockNumbers: string[] = [
    '12345',
    '67890',
    '24680',
    '13579',
    '98765',
    '54321',
    '11223',
    '44556',
    '77889',
    '99001'
    // Agrega más números aquí
  ];

  private mockProvinces: string[] = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango'
    // Agrega más provincias aquí
  ];

  private copyrights: any[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.generateRandomCopyright();
    }
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private generateRandomCopyright() {
    const id = this.copyrights.length + 1;
    const randomTitle = this.randomElement(this.mockTitles);
    const randomDescription = this.randomElement(this.mockDescriptions);
    const randomDate = this.randomDate(new Date(2023, 0, 1), new Date());
    const randomNumber = this.randomElement(this.mockNumbers);
    const randomInstitution = this.randomElement(this.mockInstitutions);
    const randomName = this.randomElement(this.mockNames);
    const randomLastName = this.randomElement(this.mockLastNames);
    const randomEmail = `${randomName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`;
    const randomPhone = `55${Math.floor(10000000 + Math.random() * 90000000)}`;
    const randomProvince = this.randomElement(this.mockProvinces);

    this.copyrights.push({
      id,
      titulo: randomTitle,
      descripcion: randomDescription,
      fecha_presentacion: randomDate.toISOString().split('T')[0],
      numero_solicitud: randomNumber,
      institucion_adscripcion: randomInstitution,
      solicitante_nombre: randomName,
      solicitante_apellidos: randomLastName,
      solicitante_email: randomEmail,
      solicitante_telefono: randomPhone,
      estado: randomProvince
    });
  }

  public getCopyrights(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const total = this.copyrights.length;

    // Simulate server-side pagination
    const paginatedCopyrights = this.copyrights.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: total,
          recordsFiltered: total,
          data: paginatedCopyrights
        });
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public getCopyright
  (id: number): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      const patent = this.copyrights.find(p => p.id === id);
      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public createCopyright
  (patent: IIntelectualPropertyModel): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      patent.id = this.copyrights.length + 1;
      this.copyrights.push(patent);
      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public updateCopyright
  (id: number, patent: IIntelectualPropertyModel): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      const index = this.copyrights.findIndex(p => p.id === id);
      if (index !== -1) {
        this.copyrights[index] = patent;
      }
      setTimeout(() => {
        observer.next(patent);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public deleteCopyright
  (id: number): Observable<void> {
    return new Observable(observer => {
      const index = this.copyrights.findIndex(p => p.id === id);
      if (index !== -1) {
        this.copyrights.splice(index, 1);
      }
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500); // Simulate network delay
    });
  }
}
