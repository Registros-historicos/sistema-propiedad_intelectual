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

    private readonly ESTATUS_FALLBACK: { [id: number]: string } = {
    /**1: 'Registrada',
    2: 'En trámite',
    3: 'Trámite con observaciones',
    4: 'Aprobada',
    5: 'Concluida',**/
    26: 'Confirmada',
    27: 'Pendiente',
    28: 'Con Observaciones',
    29: 'Rechazada',
    30: 'Finalizada',
    31: 'Cancelada',
    32: 'En pausa',
    33: 'En espera de validación',
    34: 'Notificada al Tecnológico'
  };


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
            let tema = r.id_tema;

            // 🔥 Asignar tema 7 a todos los estatus que vienen con id_tema null
            if (!tema) {
              const nombresEstatus = [
                'Cancelada', 'Confirmada', 'Con Observaciones', 'En espera de validación',
                'En pausa', 'Finalizada', 'Notificada al Tecnológico', 'Pendiente', 'Rechazada'
              ];
              if (nombresEstatus.includes(r.nombre)) {
                tema = 7;
              }
            }

            if (tema && !grouped[tema]) {
              grouped[tema] = { lista: [], mapa: {} };
            }

            if (tema) {
              grouped[tema].lista.push(r);
              grouped[tema].mapa[r.id_param] = r;
            }
          }

          return grouped;
        }),
        shareReplay(1)
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

convertirRegistroConObjetos(registro: any, catalogos: Catalogos): any {
    const result = { ...registro };

    Object.keys(result).forEach((key) => {
      if (key.endsWith('_param') || key === 'institucion') {
        const id = result[key];
        const tema = this.getTemaPorCampo(key);

        if (tema && id && !isNaN(Number(id))) {
          const idNum = Number(id);
          const objeto = this.getObjeto(catalogos, tema, idNum);

          if (objeto) {
            result[key] = objeto;
          } else {
            if (key === 'estatus_param' && this.ESTATUS_FALLBACK[idNum]) {
              result[key] = {
                id_param: idNum,
                nombre: this.ESTATUS_FALLBACK[idNum],
                id_tema: tema,
                id_param_padre: null
              };
            } else {
              console.warn('❌ No encontrado:', key, 'id:', idNum, 'tema:', tema);
            }
          }
        }
      }
    });

    return result;
  }



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
      estatus_param: 7,
      medio_ingreso_param: 8,
      tipo_registro_param: 3,
      tipo_sector_param: 2,
      institucion: 17
    };
    return mapa[campo] ?? null;
  }
}