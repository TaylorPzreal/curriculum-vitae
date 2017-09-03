import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { AppService } from '../../app.service';

@Injectable()
export class ChatService {
  private url: string;
  private socket: any;

  constructor(private appService: AppService) {
    this.url = this.appService.baseURL.replace(/(.)*\/api$/, '');
    this.socket = io(this.url, {
      path: '/api/socket.io'
    });
  }

  public sendMessage(msg: object): void {
    this.socket.emit('chat', msg);
  }

  public getMessage(): Observable<any> {
    const observable = new Observable((observer) => {
      this.socket.on('chat', (data: object) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }
}
