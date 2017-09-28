import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../app.service';

@Injectable()
export class ShareService {
  constructor(private appService: AppService) {}

  /**
   * 生成Wechat signature
   *
   * @returns {Observable<any>}
   * @memberof ShareService
   */
  public generateWechatSignature(): Observable<any> {
    const method = 'wechat/generate/signature';
    // return this.appService.POST(method, {url: location.href});
    return this.appService.POST(method, {url: encodeURIComponent(location.href.split('#')[0])});
  }
}
