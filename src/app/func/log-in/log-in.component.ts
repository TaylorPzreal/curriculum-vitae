import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBar } from '../../tool/snackbar';
import { LoginService } from './log-in.service';
import { AppService } from '../../app.service';

import { LogIn } from './log-in.model';

@Component({
  selector: 'cv-login',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.scss'],
  providers: [LoginService]
})
export class LogInComponent implements OnInit {
  public userForm: FormGroup;
  public user: LogIn;

  public formErrors = {
    email: '',
    password: ''
  };

  public validationMessages = {
    email: {
      required: 'Email is required.',
      pattern: 'Please enter a valid email address'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters long.',
      maxlength: 'Password cannot be more than 32 characters long.'
    }
  };
  private EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(
    private loginService: LoginService,
    private titleService: Title,
    private router: Router,
    private snackbar: SnackBar,
    private fb: FormBuilder,
    private appService: AppService
    ) {
    this.titleService.setTitle('Log in - HoneyMorning');
    this.user = new LogIn();
  }

  public ngOnInit() {
    this.buildForm();
  }

  public loginWithGithub() {
    window.location.href = 'https://github.com/login/oauth/authorize' + '?response_type=code' + '&client_id=3405df2b2fca58331dc1';
  }

  public onSubmit() {
    this.loginService.login(this.user).subscribe((data: any) => {
      if (2000 === data.code) {
        this.snackbar.success('Logged in', 'Success');
        data.data.logo = data.data.logo ? data.data.logo : 'src/assets/images/logo/logo-default.png';

        // transfer data to AppService.
        this.appService.announceAccount(data.data);
        this.router.navigate(['/']);
      }
    });
  }

  private buildForm(): void {
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      password: [this.user.password, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
  }

  private onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;

    for (const field of Object.keys(this.formErrors)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
