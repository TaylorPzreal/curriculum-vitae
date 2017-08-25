import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr';

import { HomeService } from './home.service';
import 'lazysizes'; // 图片懒加载

@Component({
  selector: 'cv-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService, private titleService: Title, public vRef: ViewContainerRef, private toastr: ToastsManager) {
    this.titleService.setTitle('Home - Honeymorning');
    this.toastr.setRootViewContainerRef(vRef);
  }

  public ngOnInit() {
    this.toastr.success('Welcome to HoneyMorning');
  }
}
