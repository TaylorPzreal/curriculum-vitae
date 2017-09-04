import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import '../assets/scss/common.scss';
import { AppService } from './app.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface IUser {
  id: number;
  name: string;
  bio: string;
  logo: string;
}

@Component({
  selector: 'cv-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public userInfo: IUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private toastr: ToastsManager,
    vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public ngOnInit() {
    // this.goToLogin();
    this.getUserInfo();
  }

    /**
     * 退出登录
     *
     * @memberof AppComponent
     */
    public logout() {
      this.appService.logout().subscribe((result: any) => {
        if (2000 === result.code) {
          this.toastr.success('Loged out', 'Success');

          // 释放存储的信息
          this.userInfo = null;
          localStorage.removeItem('user');
        }
      }, (error: any) => {
        console.error(error);
      });
    }

  private goToLogin() {
    const a = this.route.params;
    this.router.navigate(['/login']);
  }

  /**
   * 获取用户基本信息
   *
   * @private
   * @memberof AppComponent
   */
  private getUserInfo() {

    // toastr.success('success', 'honeymorningyarn start');
    // 1. 判断cookie的sid是否存在，存在直接在Localstroage获取，不存在调用后端接口。
    const cookie = document.cookie;

    if (cookie && /isLogin=true/.test(cookie) && localStorage.getItem('user')) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
    } else {
      this.appService.getUserInfo().subscribe((result: any) => {
        if (2000 === result.code) {
          // save to LocalStorage
          this.userInfo = result.data;
          localStorage.setItem('user', JSON.stringify(result.data));

          this.toastr.success('Login Success', 'Welcome');
        } else {
          console.warn(result.msg);
        }
      }, (error: any) => {
        console.warn(error);
      });
    }
  }

 }
