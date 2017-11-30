import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../../app.service';
import { Blog } from './blog.model';

@Injectable()
export class BlogEditService {
  constructor(private http: HttpClient, private appService: AppService) { }

  /**
   * add new blog
   *
   * @param {Blog} blog
   * @returns {Observable<any>}
   * @memberof BlogEditService
   */
  public addBlog(blog: Blog): Observable<any> {
     const method = '/blog';
     return this.appService.POST(method, blog);
  }

  /**
   * update blog
   *
   * @param {Blog} blog
   * @returns {Observable<any>}
   * @memberof BlogEditService
   */
  public updateBlog(blog: Blog): Observable<any> {
    const method = '/blog';
    return this.appService.PUT(method, blog);
  }

  public searchBlogById(md5: string): Observable<any> {
    const method = `/blog/${md5}`;
    return this.appService.GET(method);
  }
}
