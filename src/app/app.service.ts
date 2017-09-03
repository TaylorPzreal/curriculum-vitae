import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
  public baseURL: string = 'https://www.honeymorning.com/api';

  constructor(private http: HttpClient) {}

  /**
   * 获取用户基本信息
   *
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public getUserInfo(): Observable<any> {
   const url = this.baseURL + '/account/profile' ;
   return this.http.get(url);
  }

  /**
   * 登出
   *
   * @return {Observable<any>}
   * @memberof AppService
   */
  public logout(): Observable<any> {
    const url = this.baseURL + '/account/logout';
    return this.http.get(url);
  }
}
