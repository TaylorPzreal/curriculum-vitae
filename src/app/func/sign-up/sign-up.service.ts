import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../app.service';
import { SignUp } from './sign-up-model';

@Injectable()
export class SignUpService {
  constructor(private appService: AppService) {}

/**
 * 注册
 *
 * @param {SignUp} param
 * @returns {Observable<any>}
 * @memberof SignUpService
 */
  public signUp(param: SignUp): Observable<any> {
   const method = '';
   return this.appService.POST(method, param);
  }
}
