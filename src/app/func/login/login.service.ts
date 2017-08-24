import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ServiceConf } from '../../service-conf';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  private baseUrl = ServiceConf.baseURL;

  constructor(private http: Http) {}

  public getJSON() {
    const url = this.baseUrl + 'db';

    return this.http.get(url).map(this.extractData).catch(ServiceConf.handleError);
  }

  public loginWithGithub() {
    return this.http
      .get(this.baseUrl + 'account/login/github')
      .map((res: Response) => {
        return res.json();
      })
      .catch(ServiceConf.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
}
