import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ServiceConf } from '../service-conf';
import { Blog } from './blog.model';

@Injectable()
export class BlogEditService {
  private baseURL = ServiceConf.baseURL;

  constructor(private http: Http) { }

  public editBlog(blog: any) {
    const url = this.baseURL + '/blog/edit';

    return this.http.post(url, blog)
      .map((res: Response) => res.json())
      .catch(ServiceConf.handleError);
  }
}
