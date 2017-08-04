import { Injectable } from '@angular/core';
import { Http, Response, Jsonp  } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ServiceConf } from '../service-conf';

@Injectable()
export class HomeService {
  private baseURL = ServiceConf.baseURL;

  constructor(private http: Http, private jsonp: Jsonp) {}

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
      .catch(ServiceConf.handleError);
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
      .catch(ServiceConf.handleError);
  }

  /**
   * get lat,lon string by ip
   *
   * @returns
   * @memberof HomeService
   */
  public getPositionByIp() {
    const url = 'https://ipinfo.io/geo?callback=JSONP_CALLBACK';

    return this.jsonp.request(url).map((res) => res.json()).catch(ServiceConf.handleError);
  }

  /**
   * get weather
   *
   * @param {string} loc
   * @returns
   * @memberof HomeService
   */
  public getWeather(loc: string) {
    const url = `https://api.darksky.net/forecast/5ab2ff9278760e1d368a58428ba116ad/${loc}?callback=JSONP_CALLBACK`;
    return this.jsonp.request(url).map((res) => res.json()).catch(ServiceConf.handleError);
  }

  public analyseGithubJs() {
    const url = `https://api.github.com/search/repositories?q=javascript&sort=stars&order=desc&per_page=50&page=1`;
    return this.http.get(url).map((res: Response) => res.json()).catch(ServiceConf.handleError);
  }

}
