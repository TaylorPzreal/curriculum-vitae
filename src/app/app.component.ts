// 引入基本样式文件

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import 'rxjs/add/operator/switchMap';
import '../assets/scss/common.scss';

@Component({
  selector: 'cv-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public currentTime: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit() {
    this.goToLogin();
    this.currentTime = moment().format('ddd MMM Do YYYY');
  }

  private goToLogin() {
    const a = this.route.params;
    this.router.navigate(['/login']);
  }

 }
