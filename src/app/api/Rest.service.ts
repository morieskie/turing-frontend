import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../app.config';
import {ApiConfigInterface} from './interface/api-config.interface';
import {Observable} from 'rxjs';

@Injectable()
export class RestService {

  public constructor(
    public client: HttpClient,
    @Inject(API_CONFIG) private apiConfig: ApiConfigInterface) {
  }

  /**
   * retrieves a resource
   */
  public get(endpoint: string, body?: object, params?: any): Observable<any> {
    // let params = new HttpParams();
    // Object.keys(body).forEach((key) => params.set(key, body[key]));
    return this.client.get<any>(`${this.apiConfig.baseUrl}/${endpoint}`, {params});
  }

  /**
   * Creates resource
   */
  public create(endpoint: string, body: any): Observable<any> {
    return this.client.post(`${this.apiConfig.baseUrl}/${endpoint}`, body, {
      observe: 'body',
      responseType: 'json'
    });
  }

  /**
   * Updates resource
   */
  public update(endpoint: string, body?: object): Observable<any> {
    return this.client.put(`${this.apiConfig.baseUrl}/${endpoint}`, body, {
      responseType: 'json'
    });
  }

  /**
   * Deletes resource
   */
  public delete(endpoint: string, body?: object): Observable<any> {
    return this.client.delete(`${this.apiConfig.baseUrl}/${endpoint}`, {
      responseType: 'json'
    });
  }
}
