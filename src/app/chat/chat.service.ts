import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'https://www.honeymorning.com';
  private socket = io(this.url, {
    path: '/api/socket.io'
  });
  // private url = 'http://localhost:3000';
  // private socket = io(this.url);

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
