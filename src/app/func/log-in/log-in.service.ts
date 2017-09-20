import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../app.service';
import { LogIn } from './log-in.model';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private appService: AppService) {}

  public loginWithGithub() {
    return this.http.get(`${this.appService.baseURL}/account/login/github`);
  }

  /**
   * Login
   *
   * @param {LogIn} param
   * @returns {Observable<any>}
   * @memberof LoginService
   */
  public login(param: LogIn): Observable<any> {
    const method = 'login/local';
    const pData: LogIn = {
      email: param.email,
      password: window.btoa(param.password)
    };
    return this.appService.POST(method, pData);
  }
}
