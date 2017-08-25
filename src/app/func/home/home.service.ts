import { Injectable } from '@angular/core';
import { Http, Response, Jsonp  } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ServiceConf } from '../../service-conf';

@Injectable()
export class HomeService {
  private baseURL = ServiceConf.baseURL;

  constructor(private http: Http, private jsonp: Jsonp) {}

}
