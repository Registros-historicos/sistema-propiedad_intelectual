import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Parametrizacion {
  id_param: number;
  nombre: string;
  id_tema: number;
  id_param_padre?: number | null;
}

export interface Catalogos {
  [temaId: number]: {
    lista: Parametrizacion[];
    mapa: { [id: number]: Parametrizacion };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ParametrizacionesService {
  private apiUrl = '/api/parametrizaciones/all/';
  private cache$?: Observable<Catalogos>;

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Obtiene y agrupa todas las parametrizaciones en memoria.
   * Solo se ejecuta una vez y se cachea en memoria.
   * Ejemplo:
   * this.paramService.getAll().subscribe(cats => this.catalogos = cats);
   */
  getAll(): Observable<Catalogos> {
    if (!this.cache$) {
      this.cache$ = this.http.get<Parametrizacion[]>(this.apiUrl).pipe(
        map((rows) => {
          const grouped: Catalogos = {};
          for (const r of rows) {
            if (!grouped[r.id_tema]) {
              grouped[r.id_tema] = { lista: [], mapa: {} };
            }
            grouped[r.id_tema].lista.push(r);
            grouped[r.id_tema].mapa[r.id_param] = r;
          }
          return grouped;
        }),
        shareReplay(1) // cachea resultado para no volver a llamar al backend
      );
    }
    return this.cache$;
  }

  /** 🔹 Devuelve el objeto completo del catálogo por su id y tema */
  getObjeto(catalogos: Catalogos, idTema: number, idParam: number): Parametrizacion | null {
    return catalogos[idTema]?.mapa[idParam] ?? null;
  }

  /** 🔹 Devuelve solo el nombre (string) de un parámetro */
  getNombre(catalogos: Catalogos, idTema: number, idParam: number): string {
    return catalogos[idTema]?.mapa[idParam]?.nombre ?? '';
  }

  /** 🔹 Convierte los campos *_param de un registro a objetos del catálogo */
  convertirRegistroConObjetos(registro: any, catalogos: Catalogos): any {
    const result = { ...registro };
    Object.keys(result).forEach((key) => {
      if (key.endsWith('_param') || key === 'institucion') {
        const id = result[key];
        const tema = this.getTemaPorCampo(key);
        if (tema && id) {
          result[key] = this.getObjeto(catalogos, tema, id);
        }
      }
    });
    return result;
  }

  /** 🔹 Convierte los objetos *_param en IDs antes de hacer PUT o POST */
  prepararPayload(data: any): any {
    const result: any = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'id_param' in value) {
        result[key] = (value as Parametrizacion).id_param;
      } else {
        result[key] = value;
      }
    });
    return result;
  }

  /** 🔹 Asocia cada campo *_param con su id_tema correspondiente */
  private getTemaPorCampo(campo: string): number | null {
    const mapa: Record<string, number> = {
      tipo_ingreso_param: 9,
      rama_param: 3,
      estatus_param: 5,
      medio_ingreso_param: 8,
      tipo_registro_param: 3,
      tipo_sector_param: 2,
      institucion: 17
    };
    return mapa[campo] ?? null;
  }
}