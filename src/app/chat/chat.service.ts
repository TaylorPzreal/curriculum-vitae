import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ServiceConf } from '../service-conf';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = ServiceConf.baseURL.replace(/(.)*\/api$/, '');
  private socket = io(this.url, {
    path: '/api/socket.io'
  });

  public sendMessage(msg: object) {
    this.socket.emit('chat', msg);
  }

  public getMessage() {
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
