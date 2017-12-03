import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';

@Injectable()
export class HomeService {
  constructor(private appService: AppService) {}

  public wsService(): WebSocket {
    const url = `ws${this.appService.baseURL.replace(/http/, '')}/home`;
    return new WebSocket(url);
  }
}
