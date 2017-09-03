import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../app.service';
import { Blog } from './blog.model';

@Injectable()
export class BlogEditService {
  constructor(private http: HttpClient, private appService: AppService) { }

  public editBlog(blog: any): Observable<any> {
    const url = `${this.appService.baseURL}/blog/edit`;
    return this.http.post(url, blog);
  }

  /**
   * GetBlogDetail
   *
   * @param {string} id
   * @returns
   * @memberof BlogEditService
   */
  public getBlogDetail(id: string): Observable<any> {
    const url = `${this.appService.baseURL}/blog/queryByTitleId/${id}`;
    return this.http.get(url);
  }
}
