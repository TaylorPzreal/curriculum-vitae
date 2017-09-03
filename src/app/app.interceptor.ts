import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  /**
   * 处理请求，和返回值校验是否有 2001 - 未登录
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof AppInterceptor
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ withCredentials: true });
    return next.handle(req).do((event) => {
      if (event instanceof HttpResponse) {
        // not login, session outdated code === '2001'
        if (event.status === 200 && event.type === 4 && event.body.code === '2001') {
          localStorage.removeItem('account');
          // 在需要登录授权的页面，应该跳转到首页或者登录页面
        }
      }
    }).catch(this.handleError);
  }

  public handleError(error: HttpErrorResponse | any) {
    return Observable.throw(error);
  }
}
