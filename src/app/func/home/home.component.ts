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
  constructor(
    private homeService: HomeService,
    private titleService: Title) {
    this.titleService.setTitle('Home - Honeymorning');
  }

  public ngOnInit() {
    // do
  }
}
