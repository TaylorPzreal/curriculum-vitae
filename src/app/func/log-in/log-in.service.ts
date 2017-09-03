import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../app.service';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private appService: AppService) {}

  public loginWithGithub() {
    return this.http.get(`${this.appService.baseURL}/account/login/github`);
  }
}
