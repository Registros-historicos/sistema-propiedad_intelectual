import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CargaMasivaService {
  constructor(private http: HttpClient) {}

  /**
   * 📥 Descarga la plantilla Excel del tipo indicado (IMPI o INDAUTOR)
   * @param tipo 'impi' | 'indautor'
   * @returns Observable con el archivo Blob listo para descargar
   */
  descargarPlantilla(tipo: 'impi' | 'indautor'): Observable<Blob> {
    const url = `/api/registros/download/plantilla/${tipo}/`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error(`Error al descargar plantilla ${tipo}:`, error);
        return throwError(() => new Error(`No se pudo descargar la plantilla ${tipo.toUpperCase()}`));
      })
    );
  }

  /**
   * 📤 Sube un archivo Excel completo al backend para carga masiva (IMPI o INDAUTOR).
   * El archivo se manda como multipart/form-data junto con id_usuario y hojas seleccionadas.
   * 
   * @param tipo 'impi' | 'indautor'
   * @param file Archivo Excel (.xlsx)
   * @param idUsuario ID del usuario actual
   * @param hojas Lista de hojas a procesar (por ejemplo '2021,2022,2025')
   */
  uploadExcel(
    tipo: 'impi' | 'indautor',
    file: File,
    hojas: string
  ): Observable<any> {
    const url = `/api/registros/${tipo}-bulk/`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('hojas', hojas);

    return this.http.post(url, formData).pipe(
      catchError((error) => {
        console.error(`Error al subir archivo ${tipo}:`, error);
        return throwError(() => new Error(`No se pudo procesar la carga masiva ${tipo.toUpperCase()}`));
      })
    );
  }
}
