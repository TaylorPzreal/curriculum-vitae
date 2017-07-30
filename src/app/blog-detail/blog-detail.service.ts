import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ServiceConf } from '../service-conf';

@Injectable()
export class BlogDetailService {
  private baseURL = ServiceConf.baseURL;

  constructor(private http: Http) { }

  /**
   * GetBlogDetail
   *
   * @param {string} id
   * @returns
   * @memberof BlogDetailService
   */
  public getBlogDetail(id: string) {
    const url = `${this.baseURL}/blog/queryByTitleId/${id}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(ServiceConf.handleError);
  }
}
