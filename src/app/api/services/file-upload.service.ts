import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UploadResponse {
  success: boolean;
  filename: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = '/api/upload';

  constructor(private http: HttpClient) {}

  /**
   * Sube un archivo al servidor
   * @param file Archivo a subir
   * @param folder Carpeta destino (opcional, por defecto 'patentes')
   * @returns Observable con la respuesta del servidor
   */
  uploadFile(file: File, folder: string = 'patentes'): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return this.http.post<UploadResponse>(`${this.apiUrl}/patentes`, formData);
  }

  /**
   * Descarga un archivo del servidor
   * @param filename Nombre del archivo
   * @param folder Carpeta donde está el archivo (opcional, por defecto 'patentes')
   * @returns Observable con el blob del archivo
   */
  downloadFile(filename: string, folder: string = 'patentes'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/patentes/${filename}`, {
      responseType: 'blob'
    });
  }

  /**
   * Obtiene la URL para visualizar un archivo
   * @param filename Nombre del archivo
   * @param folder Carpeta donde está el archivo (opcional, por defecto 'patentes')
   * @returns URL del archivo
   */
  getFileUrl(filename: string, folder: string = 'patentes'): string {
    return `${this.apiUrl}/patentes/${filename}`;
  }

  /**
   * Elimina un archivo del servidor
   * @param filename Nombre del archivo
   * @param folder Carpeta donde está el archivo (opcional, por defecto 'patentes')
   * @returns Observable con la respuesta del servidor
   */
  deleteFile(filename: string, folder: string = 'patentes'): Observable<any> {
    return this.http.delete(`${this.apiUrl}/patentes/${filename}`);
  }
}
