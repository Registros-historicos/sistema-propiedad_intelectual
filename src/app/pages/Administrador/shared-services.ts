
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface IInstitucionModel {
  id: number;
  nombre: string;
  entidad_federativa: string;
}

export interface DataTablesResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
}

export interface ICoordinatorModel {
  id: number;
  nombre: string;
  apellidos: string;
  edad: number;
  entidad_federativa: string;
  institucion_adscripcion: string;
  sexo: string;
  telefono: string;
  email: string;
  rfc: string;
  curp: string;
  oficio_asignacion?: File;
  oficio_asignacion_url?: string;
  created_at?: string;
}

export interface IApplicantModel {
  id: number;
  nombre: string;
  apellidos: string;
  edad: number;
  entidad_federativa: string;
  institucion_adscripcion: string;
  sexo: string;
  telefono: string;
  email: string;
  rfc: string;
  curp: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private apiUrl = 'api/instituciones';

  constructor(private http: HttpClient) { }

  getInstituciones(): Observable<IInstitucionModel[]> {

    return of(this.getMockInstituciones());
    // return this.http.get<IInstitucionModel[]>(this.apiUrl);
  }

  getInstitucionesByEntidad(entidad: string): Observable<IInstitucionModel[]> {
    const todasLasInstituciones = this.getMockInstituciones();
    const institucionesFiltradas = todasLasInstituciones.filter(
      inst => inst.entidad_federativa === entidad
    );
    return of(institucionesFiltradas);
    // return this.http.get<IInstitucionModel[]>(`${this.apiUrl}?entidad=${entidad}`);
  }

  getMockInstituciones(): IInstitucionModel[] {
    const instituciones: IInstitucionModel[] = [];

    for (const [entidadId, institucionesEntidad] of Object.entries(ENTIDADES_FEDERATIVAS_MAP)) {
      const entidadObj = ENTIDADES_FEDERATIVAS_DATA.find(e => e.id === parseInt(entidadId));
      if (entidadObj) {
        institucionesEntidad.forEach(inst => {
          instituciones.push({
            id: inst.id,
            nombre: inst.nombre,
            entidad_federativa: entidadObj.nombre
          });
        });
      }
    }

    return instituciones;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  private apiUrl = 'api/coordinators';

  constructor(private http: HttpClient, private institucionService: InstitucionService) { }

  getCoordinators(params: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(`${this.apiUrl}/datatable`, params);
  }

  getCoordinator(id: number): Observable<ICoordinatorModel> {
    return this.http.get<ICoordinatorModel>(`${this.apiUrl}/${id}`);
  }

  createCoordinator(coordinator: ICoordinatorModel): Observable<ICoordinatorModel> {
    const formData = this.createFormData(coordinator);
    return this.http.post<ICoordinatorModel>(this.apiUrl, formData);
  }

  updateCoordinator(id: number, coordinator: ICoordinatorModel): Observable<ICoordinatorModel> {
    const formData = this.createFormData(coordinator);
    return this.http.put<ICoordinatorModel>(`${this.apiUrl}/${id}`, formData);
  }

  deleteCoordinator(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getInstituciones(): Observable<IInstitucionModel[]> {
    return this.institucionService.getInstituciones();
  }

  private createFormData(coordinator: ICoordinatorModel): FormData {
    const formData = new FormData();

    Object.keys(coordinator).forEach(key => {
      if (key === 'oficio_asignacion' && coordinator[key] instanceof File) {
        formData.append(key, coordinator[key], coordinator[key].name);
      } else if (key !== 'oficio_asignacion') {
        formData.append(key, coordinator[key as keyof ICoordinatorModel]?.toString() || '');
      }
    });

    return formData;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private apiUrl = 'api/applicants';

  constructor(private http: HttpClient, private institucionService: InstitucionService) { }

  getApplicants(params: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(`${this.apiUrl}/datatable`, params);
  }

  getApplicant(id: number): Observable<IApplicantModel> {
    return this.http.get<IApplicantModel>(`${this.apiUrl}/${id}`);
  }

  createApplicant(applicant: IApplicantModel): Observable<IApplicantModel> {
    return this.http.post<IApplicantModel>(this.apiUrl, applicant);
  }

  updateApplicant(id: number, applicant: IApplicantModel): Observable<IApplicantModel> {
    return this.http.put<IApplicantModel>(`${this.apiUrl}/${id}`, applicant);
  }

  deleteApplicant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getInstituciones(): Observable<IInstitucionModel[]> {
    return this.institucionService.getInstituciones();
  }
}

export class ValidationUtils {
  static validateRFC(rfc: string): boolean {
    const rfcPattern = /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
    return rfcPattern.test(rfc);
  }

  static validateCURP(curp: string): boolean {
    const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
    return curpPattern.test(curp);
  }

  static validatePhone(phone: string): boolean {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  }

  static validateEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  }
}

export const SEXO_OPTIONS = ['Masculino', 'Femenino', 'Otro'];

export const ENTIDADES_FEDERATIVAS = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Estado de México',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas'
];

export const ENTIDADES_FEDERATIVAS_DATA = [
  { id: 1, nombre: 'Aguascalientes' },
  { id: 2, nombre: 'Baja California' },
  { id: 3, nombre: 'Baja California Sur' },
  { id: 4, nombre: 'Campeche' },
  { id: 5, nombre: 'Chiapas' },
  { id: 6, nombre: 'Chihuahua' },
  { id: 7, nombre: 'Ciudad de México' },
  { id: 8, nombre: 'Coahuila' },
  { id: 9, nombre: 'Colima' },
  { id: 10, nombre: 'Durango' },
  { id: 11, nombre: 'Guanajuato' },
  { id: 12, nombre: 'Guerrero' },
  { id: 13, nombre: 'Hidalgo' },
  { id: 14, nombre: 'Jalisco' },
  { id: 15, nombre: 'Estado de México' },
  { id: 16, nombre: 'Michoacán' },
  { id: 17, nombre: 'Morelos' },
  { id: 18, nombre: 'Nayarit' },
  { id: 19, nombre: 'Nuevo León' },
  { id: 20, nombre: 'Oaxaca' },
  { id: 21, nombre: 'Puebla' },
  { id: 22, nombre: 'Querétaro' },
  { id: 23, nombre: 'Quintana Roo' },
  { id: 24, nombre: 'San Luis Potosí' },
  { id: 25, nombre: 'Sinaloa' },
  { id: 26, nombre: 'Sonora' },
  { id: 27, nombre: 'Tabasco' },
  { id: 28, nombre: 'Tamaulipas' },
  { id: 29, nombre: 'Tlaxcala' },
  { id: 30, nombre: 'Veracruz' },
  { id: 31, nombre: 'Yucatán' },
  { id: 32, nombre: 'Zacatecas' }
];

export const ENTIDADES_FEDERATIVAS_MAP: { [key: number]: { id: number; nombre: string }[] } = {
  1: [ // Aguascalientes
    { id: 1, nombre: 'Instituto Tecnológico de Aguascalientes' },
    { id: 2, nombre: 'Instituto Tecnológico de Pabellón de Arteaga' },
    { id: 3, nombre: 'Instituto Tecnológico El Llano Aguascalientes' }
  ],
  2: [ // Baja California
    { id: 4, nombre: 'Instituto Tecnológico de Ensenada' },
    { id: 5, nombre: 'Instituto Tecnológico de Mexicali' },
    { id: 6, nombre: 'Instituto Tecnológico de Tijuana' }
  ],
  3: [ // Baja California Sur
    { id: 7, nombre: 'Instituto Tecnológico de La Paz' },
    { id: 8, nombre: 'Instituto Tecnológico Superior de Cd. Constitución' },
    { id: 9, nombre: 'Instituto Tecnológico Superior de Mulegé' },
    { id: 10, nombre: 'Tecnológico de Estudios Superiores de Los Cabos' }
  ],
  4: [ // Campeche
    { id: 11, nombre: 'Instituto Tecnológico de Campeche' },
    { id: 12, nombre: 'Instituto Tecnológico de Chiná' },
    { id: 13, nombre: 'Instituto Tecnológico de Lerma' },
    { id: 14, nombre: 'Instituto Tecnológico Superior de Calkiní' },
    { id: 15, nombre: 'Instituto Tecnológico Superior de Escárcega' },
    { id: 16, nombre: 'Instituto Tecnológico Superior de Hopelchén' }
  ],
  5: [ // Chiapas
    { id: 17, nombre: 'Instituto Tecnológico de Comitán' },
    { id: 18, nombre: 'Instituto Tecnológico de Frontera Comalapa' },
    { id: 19, nombre: 'Instituto Tecnológico de Tapachula' },
    { id: 20, nombre: 'Instituto Tecnológico de Tuxtla Gutiérrez' },
    { id: 21, nombre: 'Instituto Tecnológico Superior de Cintalapa' }
  ],
  6: [ // Chihuahua
    { id: 22, nombre: 'Instituto Tecnológico de Chihuahua' },
    { id: 23, nombre: 'Instituto Tecnológico de Chihuahua II' },
    { id: 24, nombre: 'Instituto Tecnológico de Ciudad Cuauhtémoc' },
    { id: 25, nombre: 'Instituto Tecnológico de Ciudad Jiménez' },
    { id: 26, nombre: 'Instituto Tecnológico de Delicias' },
    { id: 27, nombre: 'Instituto Tecnológico de Parral' },
    { id: 28, nombre: 'Instituto Tecnológico Superior de Nuevo Casas Grandes' }
  ],
  7: [ // Ciudad de México
    { id: 29, nombre: 'Instituto Tecnológico de Gustavo A. Madero' },
    { id: 30, nombre: 'Instituto Tecnológico de Gustavo A. Madero II' },
    { id: 31, nombre: 'Instituto Tecnológico de Iztapalapa' },
    { id: 32, nombre: 'Instituto Tecnológico de Iztapalapa II' },
    { id: 33, nombre: 'Instituto Tecnológico de Milpa Alta' },
    { id: 34, nombre: 'Instituto Tecnológico de Milpa Alta II' },
    { id: 35, nombre: 'Instituto Tecnológico de Tláhuac' },
    { id: 36, nombre: 'Instituto Tecnológico de Tláhuac II' },
    { id: 37, nombre: 'Instituto Tecnológico de Tlalpan' }
  ],
  8: [ // Coahuila
    { id: 38, nombre: 'Instituto Tecnológico de Piedras Negras' },
    { id: 39, nombre: 'Instituto Tecnológico de Saltillo' },
    { id: 40, nombre: 'Instituto Tecnológico de Torreón' },
    { id: 41, nombre: 'Instituto Tecnológico Superior de Monclova' },
    { id: 42, nombre: 'Instituto Tecnológico Superior de Múzquiz' },
    { id: 43, nombre: 'Instituto Tecnológico Superior de San Pedro de las Colonias' }
  ],
  9: [ // Colima
    { id: 44, nombre: 'Instituto Tecnológico de Colima' }
  ],
  10: [ // Durango
    { id: 45, nombre: 'Instituto Tecnológico de Durango' },
    { id: 46, nombre: 'Instituto Tecnológico de El Salto' },
    { id: 47, nombre: 'Instituto Tecnológico Superior de la Región de los Llanos' },
    { id: 48, nombre: 'Instituto Tecnológico Superior de Lerdo' },
    { id: 49, nombre: 'Instituto Tecnológico Superior de Santa María del Oro' },
    { id: 50, nombre: 'Instituto Tecnológico Superior de Santiago Papasquiaro' },
    { id: 51, nombre: 'Instituto Tecnológico de Valle del Guadiana' }
  ],
  11: [ // Guanajuato
    { id: 52, nombre: 'Instituto Tecnológico de Celaya' },
    { id: 53, nombre: 'Instituto Tecnológico de León' },
    { id: 54, nombre: 'Instituto Tecnológico de Roque' },
    { id: 55, nombre: 'Centro Regional de Optimización y Desarrollo de Equipo - CRODE Celaya' }
  ],
  12: [ // Guerrero
    { id: 56, nombre: 'Instituto Tecnológico de Acapulco' },
    { id: 57, nombre: 'Instituto Tecnológico de Chilpancingo' },
    { id: 58, nombre: 'Instituto Tecnológico de Ciudad Altamirano' },
    { id: 59, nombre: 'Instituto Tecnológico de Costa Grande' },
    { id: 60, nombre: 'Instituto Tecnológico de Iguala' },
    { id: 61, nombre: 'Instituto Tecnológico de San Marcos' },
    { id: 62, nombre: 'Instituto Tecnológico Superior de la Costa Chica' },
    { id: 63, nombre: 'Instituto Tecnológico Superior de la Montaña' }
  ],
  13: [ // Hidalgo
    { id: 64, nombre: 'Instituto Tecnológico de Huejutla' },
    { id: 65, nombre: 'Instituto Tecnológico de Pachuca' },
    { id: 66, nombre: 'Instituto Tecnológico Superior de Huichapan' },
    { id: 67, nombre: 'Instituto Tecnológico Superior del Occidente del Edo. de Hgo' },
    { id: 68, nombre: 'Instituto Tecnológico Superior del Oriente del Estado de Hidalgo' }
  ],
  14: [ // Jalisco
    { id: 69, nombre: 'Instituto Tecnológico de Ciudad Guzmán' },
    { id: 70, nombre: 'Instituto Tecnológico de Ocotlán' },
    { id: 71, nombre: 'Instituto Tecnológico de Tlajomulco' },
    { id: 72, nombre: 'Instituto Tecnológico José Mario Molina Pasquel y Henríquez' }
  ],
  15: [ // Estado de México
    { id: 73, nombre: 'Instituto Tecnológico de Tlalnepantla' },
    { id: 74, nombre: 'Instituto Tecnológico de Toluca' },
    { id: 75, nombre: 'Tecnológico de Estudios Superiores de Chicoloapan' },
    { id: 76, nombre: 'Tecnológico de Estudios Superiores de Jilotepec' }
  ],
  16: [ // Michoacán
    { id: 77, nombre: 'Instituto Tecnológico de Apatzingán' },
    { id: 78, nombre: 'Instituto Tecnológico de Jiquilpan' },
    { id: 79, nombre: 'Instituto Tecnológico de La Piedad' },
    { id: 80, nombre: 'Instituto Tecnológico de Lázaro Cárdenas' },
    { id: 81, nombre: 'Instituto Tecnológico de Morelia' },
    { id: 82, nombre: 'Instituto Tecnológico de Tacámbaro' },
    { id: 83, nombre: 'Instituto Tecnológico de Zamora' },
    { id: 84, nombre: 'Instituto Tecnológico de Zitácuaro' },
    { id: 85, nombre: 'Instituto Tecnológico Superior de Apatzingán' },
    { id: 86, nombre: 'Instituto Tecnológico Superior de Coalcomán' },
    { id: 87, nombre: 'Instituto Tecnológico Superior de Ciudad Hidalgo' },
    { id: 88, nombre: 'Instituto Tecnológico Superior de Huetamo' },
    { id: 89, nombre: 'Instituto Tecnológico Superior de Los Reyes' },
    { id: 90, nombre: 'Instituto Tecnológico Superior de Pátzcuaro' },
    { id: 91, nombre: 'Instituto Tecnológico Superior de Puruándiro' },
    { id: 92, nombre: 'Instituto Tecnológico Superior P´urhépecha' },
    { id: 93, nombre: 'Instituto Tecnológico del Valle de Morelia' }
  ],
  17: [ // Morelos
    { id: 94, nombre: 'Instituto Tecnológico de Cuautla' },
    { id: 95, nombre: 'Instituto Tecnológico de Zacatepec' },
    { id: 96, nombre: 'Centro Nacional de Investigación y Desarrollo Tecnológico - CENDET' }
  ],
  18: [ // Nayarit
    { id: 97, nombre: 'Instituto Tecnológico de Bahía de Banderas' },
    { id: 98, nombre: 'Instituto Tecnológico de Tepic' },
    { id: 99, nombre: 'Instituto Tecnológico del Norte de Nayarit' },
    { id: 100, nombre: 'Instituto Tecnológico del Sur de Nayarit' }
  ],
  19: [ // Nuevo León
    { id: 101, nombre: 'Instituto Tecnológico de Linares' },
    { id: 102, nombre: 'Instituto Tecnológico de Nuevo León' }
  ],
  20: [ // Oaxaca
    { id: 103, nombre: 'Instituto Tecnológico de Comitancillo' },
    { id: 104, nombre: 'Instituto Tecnológico de Oaxaca' },
    { id: 105, nombre: 'Instituto Tecnológico de Pinotepa' },
    { id: 106, nombre: 'Instituto Tecnológico de Pochutla' },
    { id: 107, nombre: 'Instituto Tecnológico de Salina Cruz' },
    { id: 108, nombre: 'Instituto Tecnológico de Tlaxiaco' },
    { id: 109, nombre: 'Instituto Tecnológico de Tuxtepec' },
    { id: 110, nombre: 'Instituto Tecnológico de Valle de Etla' },
    { id: 111, nombre: 'Instituto Tecnológico del Istmo' },
    { id: 112, nombre: 'Instituto Tecnológico Superior de San Miguel el Grande' },
    { id: 113, nombre: 'Instituto Tecnológico Superior de Teposcolula' }
  ],
  21: [ // Puebla
    { id: 114, nombre: 'Instituto Tecnológico de Puebla' },
    { id: 115, nombre: 'Instituto Tecnológico de Tehuacán' },
    { id: 116, nombre: 'Instituto Tecnológico de Tecomatlán' },
    { id: 117, nombre: 'Instituto Tecnológico Superior de Acatlán de Osorio' },
    { id: 118, nombre: 'Instituto Tecnológico Superior de Atlixco' },
    { id: 119, nombre: 'Instituto Tecnológico Superior de Ciudad Serdán' },
    { id: 120, nombre: 'Instituto Tecnológico Superior de Huauchinango' },
    { id: 121, nombre: 'Instituto Tecnológico Superior de Huehuetla' },
    { id: 122, nombre: 'Instituto Tecnológico Superior de Libres' },
    { id: 123, nombre: 'Instituto Tecnológico Superior de San Andrés Tuxtla' },
    { id: 124, nombre: 'Instituto Tecnológico Superior de San Martín Texmelucan' },
    { id: 125, nombre: 'Instituto Tecnológico Superior de Tepeaca' },
    { id: 126, nombre: 'Instituto Tecnológico Superior de Tepexi de Rodríguez' },
    { id: 127, nombre: 'Instituto Tecnológico Superior de Teziutlán' },
    { id: 128, nombre: 'Instituto Tecnológico Superior de Tlatlauquitepec' },
    { id: 129, nombre: 'Instituto Tecnológico Superior de Venustiano Carranza' },
    { id: 130, nombre: 'Instituto Tecnológico Superior de Zacapoaxtla' },
    { id: 131, nombre: 'Instituto Tecnológico Superior de la Sierra Negra de Ajalpan' },
    { id: 132, nombre: 'Instituto Tecnológico Superior de la Sierra Norte de Puebla' }
  ],
  22: [ // Querétaro
    { id: 133, nombre: 'Instituto Tecnológico de Querétaro' },
    { id: 134, nombre: 'Instituto Tecnológico de San Juan del Río' },
    { id: 135, nombre: 'Centro Interdisciplinario de Investigación y Docencia en Educación Técnica - CIDET' }
  ],
  23: [ // Quintana Roo
    { id: 136, nombre: 'Instituto Tecnológico de Cancún' },
    { id: 137, nombre: 'Instituto Tecnológico de Chetumal' },
    { id: 138, nombre: 'Instituto Tecnológico de la Zona Maya' },
    { id: 139, nombre: 'Instituto Tecnológico Superior de Felipe Carrillo Puerto' }
  ],
  24: [ // San Luis Potosí
    { id: 140, nombre: 'Instituto Tecnológico de Ciudad Valles' },
    { id: 141, nombre: 'Instituto Tecnológico de Matehuala' },
    { id: 142, nombre: 'Instituto Tecnológico de San Luis Potosí' },
    { id: 143, nombre: 'Instituto Tecnológico Superior de Ebano' },
    { id: 144, nombre: 'Instituto Tecnológico Superior de Rioverde' },
    { id: 145, nombre: 'Instituto Tecnológico Superior de San Luis Potosí, Capital' },
    { id: 146, nombre: 'Instituto Tecnológico Superior de Tamazunchale' }
  ],
  25: [ // Sinaloa
    { id: 147, nombre: 'Instituto Tecnológico de Culiacán' },
    { id: 148, nombre: 'Instituto Tecnológico de Sinaloa de Leyva' },
    { id: 149, nombre: 'Instituto Tecnológico Superior de El Dorado' },
    { id: 150, nombre: 'Instituto Tecnológico Superior de Guasave' }
  ],
  26: [ // Sonora
    { id: 151, nombre: 'Instituto Tecnológico de Agua Prieta' },
    { id: 152, nombre: 'Instituto Tecnológico de Guaymas' },
    { id: 153, nombre: 'Instituto Tecnológico de Hermosillo' },
    { id: 154, nombre: 'Instituto Tecnológico de Huatabampo' },
    { id: 155, nombre: 'Instituto Tecnológico de Nogales' },
    { id: 156, nombre: 'Instituto Tecnológico Superior de Cananea' },
    { id: 157, nombre: 'Instituto Tecnológico Superior de Puerto Peñasco' },
    { id: 158, nombre: 'Instituto Tecnológico del Valle del Yaqui' }
  ],
  27: [ // Tabasco
    { id: 159, nombre: 'Instituto Tecnológico de Huimanguillo' },
    { id: 160, nombre: 'Instituto Tecnológico de la Chontalpa' },
    { id: 161, nombre: 'Instituto Tecnológico de la Zona Olmeca' },
    { id: 162, nombre: 'Instituto Tecnológico de Villahermosa' },
    { id: 163, nombre: 'Instituto Tecnológico Superior de Centla' },
    { id: 164, nombre: 'Instituto Tecnológico Superior de Comalcalco' },
    { id: 165, nombre: 'Instituto Tecnológico Superior de la Región Sierra' },
    { id: 166, nombre: 'Instituto Tecnológico Superior de Macuspana' },
    { id: 167, nombre: 'Instituto Tecnológico Superior de Villa la Venta' },
    { id: 168, nombre: 'Instituto Tecnológico Superior de los Ríos' }
  ],
  28: [ // Tamaulipas
    { id: 169, nombre: 'Instituto Tecnológico de Altamira' },
    { id: 170, nombre: 'Instituto Tecnológico de Ciudad Madero' },
    { id: 171, nombre: 'Instituto Tecnológico de Ciudad Victoria' },
    { id: 172, nombre: 'Instituto Tecnológico de Matamoros' },
    { id: 173, nombre: 'Instituto Tecnológico de Nuevo Laredo' },
    { id: 174, nombre: 'Instituto Tecnológico de Reynosa' },
    { id: 175, nombre: 'Instituto Tecnológico Superior del Mante' }
  ],
  29: [ // Tlaxcala
    { id: 176, nombre: 'Instituto Tecnológico de Apizaco' },
    { id: 177, nombre: 'Instituto Tecnológico del Altiplano de Tlaxcala' },
    { id: 178, nombre: 'Instituto Tecnológico Superior de Tlaxco' }
  ],
  30: [ // Veracruz
    { id: 179, nombre: 'Instituto Tecnológico de Cerro Azul' },
    { id: 180, nombre: 'Instituto Tecnológico de Minatitlán' },
    { id: 181, nombre: 'Instituto Tecnológico de Orizaba' },
    { id: 182, nombre: 'Instituto Tecnológico de Úrsulo Galván' },
    { id: 183, nombre: 'Instituto Tecnológico de Veracruz' },
    { id: 184, nombre: 'Instituto Tecnológico Superior de Acayucan' },
    { id: 185, nombre: 'Instituto Tecnológico Superior de Álamo Temapache' },
    { id: 186, nombre: 'Instituto Tecnológico Superior de Alvarado' },
    { id: 187, nombre: 'Instituto Tecnológico Superior de Chicontepec' },
    { id: 188, nombre: 'Instituto Tecnológico Superior de Cosamaloapan' },
    { id: 189, nombre: 'Instituto Tecnológico Superior de Huatusco' },
    { id: 190, nombre: 'Instituto Tecnológico Superior de Jesús Carranza' },
    { id: 191, nombre: 'Instituto Tecnológico Superior de Juan Rodríguez Clara' },
    { id: 192, nombre: 'Instituto Tecnológico Superior de Martínez de la Torre' },
    { id: 193, nombre: 'Instituto Tecnológico Superior de Misantla' },
    { id: 194, nombre: 'Instituto Tecnológico Superior de Naranjos' },
    { id: 195, nombre: 'Instituto Tecnológico Superior de Pánuco' },
    { id: 196, nombre: 'Instituto Tecnológico Superior de Perote' },
    { id: 197, nombre: 'Instituto Tecnológico Superior de Poza Rica' },
    { id: 198, nombre: 'Instituto Tecnológico Superior de San Andrés Tuxtla' },
    { id: 199, nombre: 'Instituto Tecnológico Superior de Tantoyuca' },
    { id: 200, nombre: 'Instituto Tecnológico Superior de Tierra Blanca' },
    { id: 201, nombre: 'Instituto Tecnológico Superior de Xalapa' },
    { id: 202, nombre: 'Instituto Tecnológico Superior de Zongolica' },
    { id: 203, nombre: 'Centro Regional de Optimización y Desarrollo de Equipo - CRODE Orizaba' }
  ],
  31: [ // Yucatán
    { id: 204, nombre: 'Instituto Tecnológico de Conkal' },
    { id: 205, nombre: 'Instituto Tecnológico de Mérida' },
    { id: 206, nombre: 'Instituto Tecnológico de Tizimín' },
    { id: 207, nombre: 'Instituto Tecnológico Superior de Motul' },
    { id: 208, nombre: 'Instituto Tecnológico Superior de Valladolid' },
    { id: 209, nombre: 'Instituto Tecnológico Superior del Sur de Yucatán' },
    { id: 210, nombre: 'Instituto Tecnológico Superior Progreso' },
    { id: 211, nombre: 'Centro Regional de Optimización y Desarrollo de Equipo - CRODE Mérida' }
  ],
  32: [ // Zacatecas
    { id: 212, nombre: 'Instituto Tecnológico de Zacatecas' },
    { id: 213, nombre: 'Instituto Tecnológico Superior de Fresnillo' },
    { id: 214, nombre: 'Instituto Tecnológico Superior de Jerez' },
    { id: 215, nombre: 'Instituto Tecnológico Superior de Loreto' },
    { id: 216, nombre: 'Instituto Tecnológico Superior de Nochistlán' },
    { id: 217, nombre: 'Instituto Tecnológico Superior de Zacatecas Norte' },
    { id: 218, nombre: 'Instituto Tecnológico Superior Zacatecas Occidente' }
  ]
};


