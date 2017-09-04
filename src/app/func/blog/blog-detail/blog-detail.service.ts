import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../../app.service';

@Injectable()
export class BlogDetailService {
  constructor(private http: HttpClient, private appService: AppService) { }

  /**
   * GetBlogDetail
   *
   * @param {string} id
   * @returns
   * @memberof BlogDetailService
   */
  public getBlogDetail(id: string): Observable<any> {
    const url = `${this.appService.baseURL}/blog/queryByTitleId/${id}`;
    return this.http.get(url);
  }
}
