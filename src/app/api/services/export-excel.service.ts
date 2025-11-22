import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  private baseUrl = '/api/tableros';
  constructor(private http: HttpClient) {}

  downloadExcelReport(dynamicPath: string): void {
    this.http.get(`${this.baseUrl}${dynamicPath}`, {
      observe: 'response',
      responseType: 'blob'
    })
    .pipe(
      map((response: HttpResponse<Blob>) => {
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = 'reporte.xlsx';
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) {
            fileName = match[1];
          }
        }

        return { file: response.body!, fileName };
      })
    )
    .subscribe({
      next: ({ file, fileName }) => {
        const blob = new Blob(
          [file],
          { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        );

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el archivo:', err);
      }
    });
  }
}
