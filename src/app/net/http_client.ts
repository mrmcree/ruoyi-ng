
import { Injectable,Injector  } from '@angular/core';
import { HttpClient,HttpParams,
  } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Http_client {
  private http: any;


  constructor(private Http: HttpClient,private injector: Injector) {
    this.http = Http;

  }


  /**
   * get 方法
   * @param {string} url
   * @param {Object} options
   * @param params
   * @returns {Observable<{}>}
   */
  public get(url: string, options?: Object, params?: any): Observable<{}> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(url, { headers:options, params: httpParams });
  }

  /**
   * post
   * @param {string} url
   * @param body
   * @param {Object} options
   * @returns {Observable<{}>}
   */
  public post(url: string, body: any = null, options?: Object): Observable<{}> {
    return this.http.post(url, body, { headers:options});
  }

  /**
   * delete
   * @param {string} url
   * @param {Object} options
   * @param params
   * @returns {Observable<{}>}
   */
  public delete(url: string, options?: Object, params?: any): Observable<{}> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.delete(url, { headers:options, params: httpParams });
  }
  /**
   * delete
   * @param {string} url
   * @param body
   * @param {Object} options
   * @returns {Observable<{}>}
   */
  public put(url: string, body: any = null, options?: Object): Observable<{}> {
    return this.http.put(url, body, { headers:options})
  }
  /**
   * post表单
   * @param {string} url
   * @param body
   * @param {Object} options
   * @returns {Observable<{}>}
   */
  public postForm(url: string, body: any = null, options?: Object): Observable<{}> {
    let httpParams = new HttpParams();
    if (body) {
      for (const key in body) {
        if (body[key] === false || body[key]) {
          httpParams = httpParams.set(key, body[key]);
        }
      }
    }
    return this.http.post(url, httpParams, { headers:options})
  }


}
