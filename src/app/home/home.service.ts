import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {
  private baseURL = 'https://www.honeymorning.com/api';

  constructor(private http: Http) {}

  /**
   * 获取文章
   *
   * @returns Obserable
   * @memberof HomeService
   */
  public getArticle() {
    const url = this.baseURL + '/blog/queryByPage/1';

    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  /**
   * 获取最新的电影
   *
   * @returns
   * @memberof HomeService
   */
  public getTopMovie() {
    const url = this.baseURL + '/movie/queryTopMovie';

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
