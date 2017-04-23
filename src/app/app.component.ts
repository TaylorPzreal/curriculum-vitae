// 引入基本样式文件

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import '../assets/scss/common.scss';

@Component({
  selector: 'cv-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit() {
    this.goToLogin();
  }

  private goToLogin() {
    const a = this.route.params;
    this.router.navigate(['/login']);
  }

 }
