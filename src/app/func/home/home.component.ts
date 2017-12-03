import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { gpgpu_util, GPGPUContext, NDArrayMathGPU, NDArrayMathCPU } from 'deeplearn';

import { HomeService } from './home.service';
import 'lazysizes'; // 图片懒加载

@Component({
  selector: 'cv-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public messages: string[] = [];
  public status: { key: number; value: string; };
  private statusObj = {
    0: 'No connect',
    1: 'Connected',
    2: 'Disconnect'
  };

  constructor(private homeService: HomeService, private titleService: Title) {
    this.titleService.setTitle('Home - Honeymorning');
    this.status = {
      key: 0,
      value: this.statusObj['0']
    };
  }

  public ngOnInit() {
    this.initWS();
  }

  public refresh() {
    this.initWS();
  }

  public initWS() {
    const ws = this.homeService.wsService();

    ws.onopen = () => {
      this.status = {
        key: 1,
        value: this.statusObj[1]
      };
    };

    ws.onerror = (event: any) => {
      console.error(event);
    };

    ws.onmessage = (event: {data: string}) => {
      this.messages.unshift(event.data);
    };

    ws.onclose = (event: any) => {
      this.status = {
        key: 2,
        value: 'Disconnect'
      };
    };
  }
}
