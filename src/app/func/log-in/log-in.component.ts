import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LoginService } from './log-in.service';

@Component({
  selector: 'cv-login',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.scss'],
  providers: [LoginService]
})
export class LogInComponent implements OnInit {
  constructor(private loginService: LoginService, private titleService: Title) {
    this.titleService.setTitle('Log in - HoneyMorning');
  }

  public ngOnInit() {
    // do
  }

  public loginWithGithub() {
    window.location.href = 'https://github.com/login/oauth/authorize' + '?response_type=code' + '&client_id=3405df2b2fca58331dc1';
  }
}
