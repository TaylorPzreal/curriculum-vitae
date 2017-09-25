import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import '../assets/scss/common.scss';
import { AppService } from './app.service';
import { SnackBar } from './tool/snackbar';

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
  public account: IUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private snackbar: SnackBar
  ) {}

  public ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('account'));

    // Listener login,update profile.
    this.appService.accountAnnounced.subscribe((account: IUser) => {
      if (account) {
        this.account = account;
      }
    });
  }

    /**
     * 退出登录
     *
     * @memberof AppComponent
     */
    public logout() {
      this.appService.logout().subscribe((result: any) => {
        if (2000 === result.code) {
          this.snackbar.success('Loged out', 'Success');

          // 释放存储的信息
          this.account = null;
          localStorage.removeItem('account');
        }
      }, (error: any) => {
        console.error(error);
      });
    }

 }
