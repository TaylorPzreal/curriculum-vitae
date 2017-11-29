import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';

@Injectable()
export class AppService {
  // public baseURL: string = 'https://www.honeymorning.com/api';
  public baseURL: string = 'http://localhost:3000/v1';

  // Observable sources
  private accountSource = new Subject<User>();
  // Observable streams
  // tslint:disable-next-line:member-ordering
  public accountAnnounced = this.accountSource.asObservable();

  constructor(private http?: HttpClient) {}

  /**
   * Service message commands
   *
   * @param {User} account
   * @memberof AppService
   */
  public announceAccount(account: User) {
    localStorage.setItem('account', JSON.stringify(account)); // store
    this.accountSource.next(account);
  }

  /**
   * 生成请求的URL, 自动去掉value为null和undefined的参数
   * 目前主要用于 GET 请求
   *
   * @param {string} method
   * @param {{ params?: object; isLocaldb: boolean }} [options]
   * @returns {string}
   * @memberof AppService
   */
  public resolveParamUrl(method: string, options?: { params?: object; isLocaldb?: boolean }): string {
    let url: string = null;

    if (options && options.isLocaldb) {
      if (/^\//.test(method)) {
        method = method.slice(0, 1);
      }
      url = method;
    } else {
      if (!/^\//.test(method)) {
        method = `/${method}`;
      }
      url = `${this.baseURL}${method}`;
    }

    if (options && options.params) {
      Object.keys(options.params).forEach((key: string, i: number) => {
        if (options.params[key] !== null && options.params[key] !== undefined) {
          url += `${i === 0 ? '?' : '&'}${key}=${options.params[key]}`;
        }
      });
    }

    return url;
  }

  /**
   * 通用GET请求
   * method is like: '/admin/add'
   * param is like: { key: 'test'}
   *
   * @param {string} method
   * @param {{param?: object, isLocaldb?: boolean}} [options]
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public GET(method: string, options?: { params?: object; isLocaldb?: boolean }): Observable<any> {
    return this.http.get(this.resolveParamUrl(method, options));
  }

  /**
   * General DELETE
   *
   * @param {string} method
   * @param {{}} [params]
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public DELETE(method: string, params?: {}): Observable<any> {
    return this.http.delete(this.resolveParamUrl(method, params));
  }

  /**
   * General PUT
   *
   * @param {string} method
   * @param {object} body
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public PUT(method: string, body: object): Observable<any> {
    return this.commonMethod(method, body);
  }

  /**
   * General PATCH
   *
   * @param {string} method
   * @param {object} body
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public PATCH(method: string, body: object): Observable<any> {
    return this.commonMethod(method, body);
  }

  /**
   * 通用POST请求
   * method is like: '/admin/add'
   * body is like: {key: 'test'}
   *
   * @param {string} method
   * @param {object} body
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public POST(method: string, body: object): Observable<any> {
    return this.commonMethod(method, body);
  }

  /**
   * 登出
   *
   * @return {Observable<any>}
   * @memberof AppService
   */
  public logout(): Observable<any> {
    const url = this.baseURL + '/auth/logout';
    return this.http.get(url);
  }

  /**
   * Init website infomation
   *
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public initWebsite(): Observable<any> {
    const method = '/home/initWebsite';
    return this.GET(method);
  }

  private commonMethod(method: string, body: object): Observable<any> {
    if (!/^\//.test(method)) {
      method = `/${method}`;
    }
    // 请求URL
    const url = `${this.baseURL}${method}`;

    // 从请求体中删除掉value为null,undefined的key
    Object.keys(body).forEach((key: string) => {
      if (body[key] === null || body[key] === undefined) {
        delete body[key];
      }
    });

    return this.http.post(url, body, {
      withCredentials: true
    });
  }
}
