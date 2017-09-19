import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackBar } from '../../tool/snackbar';

import { SignUpService } from './sign-up.service';
import { SignUp } from './sign-up-model';
import { forbiddenNameValidator } from './forbidden-name.directive';
import { validateEmailValidator } from './validate-email.directive';

@Component({
  selector: 'hm-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SignUpService]
})
export class SignUpComponent implements OnInit {
  public userForm: FormGroup;
  public user: SignUp;

  public formErrors = {
    name: '',
    email: '',
    password: ''
  };

  public validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 4 characters long.',
      maxlength: 'Name cannot be more than 24 characters long.',
      forbiddenName: 'Someone named "sb" cannot be a username.'
    },
    email: {
      required: 'Email is required.',
      validateEmail: 'Please enter a valid email address'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters long.',
      maxlength: 'Password cannot be more than 32 characters long.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private signUpService: SignUpService,
    private snackbar: SnackBar,
    private router: Router
    ) {
    this.user = {
      name: null,
      password: null,
      email: null
    };

    this.titleService.setTitle('Sign up - HoneyMorning');
  }

  public ngOnInit(): void {
    this.buildForm();
  }

// submit sign up form
  public onSubmit() {
    this.signUp();
  }

  private signUp() {
    this.signUpService.signUp(this.user).subscribe((data: any) => {
      if (2000 === data.code) {
        this.snackbar.success('Sign up', 'Success');
        this.router.navigate(['/login']);
      } else if (3001 === data.code) {
        const control = this.userForm.get('name');
        control.setErrors({hasName: data.msg});
        this.formErrors.name = data.msg;
      } else if (3002 === data.code) {
        const control = this.userForm.get('email');
        control.setErrors({hasEmail: data.msg});
        this.formErrors.email = data.msg;
      }
    });
  }

  private buildForm(): void {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(24), forbiddenNameValidator(/sb/gi)]],
      email: [this.user.email, [Validators.required, validateEmailValidator()]],
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
