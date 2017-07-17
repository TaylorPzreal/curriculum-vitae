import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  private baseUrl = 'https://localhost:3000/';

  constructor(private http: Http) {}

  public getJSON() {
    const url = this.baseUrl + 'db';

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public loginWithGithub () {
    return this.http.get(this.baseUrl + 'account/loginWithGithub').map((res: Response) => {
      return res.json();
    }).catch(this.handleError);
  }

}
