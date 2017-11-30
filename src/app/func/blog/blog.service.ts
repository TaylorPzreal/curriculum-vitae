import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../app.service';

@Injectable()
export class BlogService {
  constructor(private http: HttpClient, private appService: AppService) { }

  /**
   * 分页获取博客列表
   *
   * @param {number} page
   * @returns
   * @memberof BlogService
   */
  public queryList(page: number = 1): Observable<any> {
    const method = `/blogs/${+page}`;
    return this.appService.GET(method);
  }

  /**
   * get blog detail
   *
   * @param {string} md5
   * @returns {Observable<any>}
   * @memberof BlogService
   */
  public findOneBlogById(md5: string): Observable<any> {
    const method = `/blog/${md5}`;
    return this.appService.GET(method);
  }

  /**
   * 对标签进行统计分析
   *
   * @returns
   * @memberof BlogService
   */
  public tagStatistic(): Observable<any> {
    const url = `${this.appService.baseURL}/blog/tagStatistic`;
    return this.http.get(url);
  }

  /**
   * Analyse blogs by monthly
   *
   * @returns
   * @memberof BlogService
   */
  public monthBlogs(): Observable<any> {
    const url = `${this.appService.baseURL}/blog/monthBlogs`;
    return this.http.get(url);
  }
}
