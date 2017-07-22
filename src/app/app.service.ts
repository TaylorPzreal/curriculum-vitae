import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
  private baseURL = 'https://www.honeymorning.com/api';

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
    .catch(this.handleError);
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
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
