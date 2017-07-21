import {
  Component,
  OnInit
} from '@angular/core';

import {
  LoginService
} from './login.service';

@Component({
  selector: 'cv-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) {}

  public ngOnInit() {
    // this.getData();
  }

  // private getData() {
  //   this.loginService.getJSON().subscribe(
  //     (results: any) => {
  //       console.warn(results);
  //     },
  //     (error: any) => {
  //       console.warn(error);
  //     }
  //   );
  // }

  public loginWithGithub() {
    window.location.href = 'https://github.com/login/oauth/authorize'
      + '?response_type=code'
      + '&client_id=3405df2b2fca58331dc1';
  }
}
