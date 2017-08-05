import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChatService } from './chat.service';
import { ToastsManager } from 'ng2-toastr';

interface IMsg {
  name: string;
  logo: string;
  msg: string;
}

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})


export class ChatComponent implements OnInit, OnDestroy {
  public messages: object[] = [];
  public message: string;
  private connection: any;

  constructor(
    private chatService: ChatService,
    public toastr: ToastsManager,
    public vRef: ViewContainerRef,
    private titleService: Title
    ) {
      this.titleService.setTitle('Chat - HoneyMorning');
    }

  public sendMessage() {
    // 如果未登录，不允许发送信息
    const cookie = document.cookie;
    if (!cookie || !/isLogin=true/.test(cookie)) {
      this.toastr.warning('Please login first.', 'Warning');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    this.toastr.info('Sending message...', 'Progress');
    this.chatService.sendMessage({
      name: user.name,
      logo: user.logo,
      msg: this.message
    });
    this.message = '';
  }

  public onEnter(value: string) {
    this.message = value;
    this.sendMessage();
  }

  public ngOnInit() {
    this.connection = this.chatService.getMessage().subscribe((msg: IMsg) => {
      this.toastr.warning('New Message', 'TIP');
      msg.logo = msg.logo || 'src/assets/images/icon.png';
      this.messages.push(msg);
    });
  }

  public ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
