import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from './sign-up-model';
import { forbiddenNameValidator } from './forbidden-name.directive';
import { validateEmailValidator } from './validate-email.directive';

@Component({
  selector: 'hm-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public userForm: FormGroup;
  public user: User;

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
      validateEmail: 'Email Reg dose not correct'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters long.',
      maxlength: 'Password cannot be more than 32 characters long.'
    }
  };

  constructor(private fb: FormBuilder, private titleService: Title) {
    this.user = {
      name: null,
      password: null,
      email: null
    };

    this.titleService.setTitle('Sign up - HoneyMorning');
  }

  public onSubmit() {
    //  signup
    console.warn('signup success');
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(24), forbiddenNameValidator(/sb/gi)]],
      email: [this.user.email, [Validators.required, validateEmailValidator(/(.)*@\w+\.\w+/ig)]],
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
