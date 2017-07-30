import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ServiceConf } from '../service-conf';

@Injectable()
export class BlogListService {
  private baseURL = ServiceConf.baseURL;

  constructor(private http: Http) { }

  public queryList(page: number) {
    const url = `${this.baseURL}/blog/querySelf/${page}`;

    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(ServiceConf.handleError);
  }
}
