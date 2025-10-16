import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import { StorageService } from './Storage.service';


/**
 * Created by Tech Group BWL on 12/09/2019.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {

  private requireJWT = false;

  constructor(
    private http: HttpClient,
    private storage: StorageService) {
  }

  public toggleJWT(status: boolean){
    this.requireJWT = status;
  }

  private getUserToken(){
    const userData = this.storage.getLocal('USER_TOKEN');
    return userData?.token || null;
  }


  /**
   * Use this service to retrieve headers with JWT AUTH
   * @returns {any}
   */
  private requiredOptions():any {
    let headerObject : any =  {
      'Content-Type': 'application/json',
    };

    // TODO: When Autorization will be required uncomment this If
    if (this.requireJWT && this.getUserToken()){
      headerObject.Authorization = 'Bearer ' + this.getUserToken()
    }
    this.requireJWT = true;
    return {headers: new HttpHeaders(headerObject)};
  }

  /**
   * Allows user to perform GET request using HttpClient, you can add custom request options if it's necessary
   * @param {string} url
   * @param params
   * @param reqOpts
   * @returns {Observable<Object>}
   */

  public get<T>(url: string, params?: any, reqOpts?: any): Observable<T> {
    if (!reqOpts) {
      reqOpts = {};
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let item of params) {
        for (let k in item) {
          reqOpts.params = reqOpts.params.append(k, item[k]);
        }
      }
    }

    if (!reqOpts.headers) {
      reqOpts.headers = this.requiredOptions().headers;
    }

    return this.http.get<T>(url, reqOpts as {
      headers: HttpHeaders;
      params?: HttpParams;
      responseType: 'json';
    });
  }


  /**
   * Allows user to perform POST request using HttpClient, you can add custom request options if it's necessary
   * @param {string} url
   * @param {any} body
   * @param params
   * @param reqOpts
   * @returns {Observable<Object>}
   */
  post(url: string, body?: any | null, params?: any, reqOpts?:any): Observable<Object> {
    !reqOpts ? reqOpts = {}: null;
    if (params) {
      reqOpts.params = new HttpParams();
      for (let item of params){
        for (let k in item) {
          reqOpts.params = reqOpts.params.append(k, item[k]);
        }
      }
    }
    if (reqOpts && !reqOpts.headers)
      reqOpts.headers = this.requiredOptions().headers;
    return this.http.post(url, body, reqOpts);
  }

  /**
   * Allows user to perform PUT request using HttpClient, you can add custom request options if it's necessary
   * @param {string} url
   * @param body
   * @param reqOpts
   * @param params: any optional Data
   * @returns {Observable<Object>}
   */
  put(url: string, body: any = null, params?: any, reqOpts?: any): Observable<Object> {
    !reqOpts ? reqOpts = {}: null;
    if (params) {
      reqOpts.params = new HttpParams();
      for (let item of params){
        for (let k in item) {
          reqOpts.params = reqOpts.params.append(k, item[k]);
        }
      }
    }
    if (reqOpts && !reqOpts.headers)
      reqOpts.headers = this.requiredOptions().headers;

    return this.http.put(url,body, reqOpts);
  }


  /**
   * Allows user to perform DELETE request using HttpClient, you can add custom request options if it's necessary
   * @param {string} url
   * @param body
   * @param reqOpts
   * @param params: any optional Data
   * @returns {Observable<Object>}
   */
  delete(url: string, body?: any,  params?: any, reqOpts?: any): Observable<Object> {
    !reqOpts ? reqOpts = {}: null;
    if (params) {
      reqOpts.params = new HttpParams();
      for (let item of params){
        for (let k in item) {
          reqOpts.params = reqOpts.params.append(k, item[k]);
        }
      }
    }

    if (reqOpts && !reqOpts.headers)
      reqOpts.headers = this.requiredOptions().headers;

    if (body) {
      reqOpts.body = body;
    }

    return this.http.delete(url, reqOpts);
  }

  patch<T>(url: string, body?: any, params?: any, reqOpts?: any) {
    !reqOpts ? reqOpts = {} : null;

    if (params) {
      reqOpts.params = new HttpParams();
      for (const item of params) {
        for (const k in item) {
          reqOpts.params = reqOpts.params.append(k, item[k]);
        }
      }
    }

    if (reqOpts && !reqOpts.headers) {
      reqOpts.headers = this.requiredOptions().headers;
    }

    return this.http.patch<T>(url, body ?? {}, reqOpts);
  }

}
