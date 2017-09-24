import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../app.service';

@Injectable()
export class GeetestService {
  constructor(private appService: AppService) {}

  public geetestRegister(): Observable<any> {
    const method = '/auth/gt/register';
    return this.appService.GET(method);
  }

  public geetestValidate(param: any): Observable<any> {
    const method = '/auth/gt/validate';
    return this.appService.POST(method, param);
  }
}
