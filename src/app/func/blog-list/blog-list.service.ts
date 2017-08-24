import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ServiceConf } from '../../service-conf';

@Injectable()
export class BlogListService {
  private baseURL = ServiceConf.baseURL;

  constructor(private http: Http) { }

  /**
   * 分页获取博客列表
   *
   * @param {number} page
   * @returns
   * @memberof BlogListService
   */
  public queryList(page: number) {
    const url = `${this.baseURL}/blog/querySelf/${page}`;

    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(ServiceConf.handleError);
  }

  /**
   * 对标签进行统计分析
   *
   * @returns
   * @memberof BlogListService
   */
  public tagStatistic() {
    const url = `${this.baseURL}/blog/tagStatistic`;

    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(ServiceConf.handleError);
  }

  /**
   * Analyse blogs by monthly
   *
   * @returns
   * @memberof BlogListService
   */
  public monthBlogs() {
    const url = `${this.baseURL}/blog/monthBlogs`;

    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(ServiceConf.handleError);
  }
}
