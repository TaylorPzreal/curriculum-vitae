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
    this.loginWithGithub();
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

  private loginWithGithub() {
    this.loginService.loginWithGithub().subscribe((result: any) => {
      console.warn(result);
    }, (error: any) => {
      console.warn(error);
    });
  }
}
