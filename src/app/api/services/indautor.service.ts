import {Injectable} from '@angular/core';
import {ApiCrudService} from '../ApiCrud.service';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndautorRegistriesService {

  constructor(
    private apiService: ApiCrudService
  ) {}

  public listImpiRegistries(page: number, size: number, search: string | null): Observable<any> {
    let url = 'http://localhost:8080/cepat-api/indautor-registries?pagination=true';

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    url += `&page=${page}&size=${size}`;

    return this.apiService.get<any>(url)
      .pipe(
        map(response => {
          return response
        })
      );
  }
}
