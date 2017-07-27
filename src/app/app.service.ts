import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ServiceConf } from './service-conf';

@Injectable()
export class AppService {
  private baseURL = ServiceConf.baseURL;

  constructor(private http: Http) {}

  /**
   * 获取用户基本信息
   *
   * @returns
   * @memberof AppService
   */
  public getUserInfo() {
   const url = this.baseURL + '/account/profile' ;

   return this.http.get(url)
    .map((res: Response) => res.json())
    .catch(ServiceConf.handleError);
  }

  /**
   * 登出
   *
   * @returns
   * @memberof AppService
   */
  public logout() {
    const url = this.baseURL + '/account/logout';

    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(ServiceConf.handleError);
  }
}
