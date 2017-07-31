import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from './sign-up-model';
import { forbiddenNameValidator } from './forbidden-name.directive';

@Component({
  selector: 'hm-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public userForm: FormGroup;
  public user: User;

  constructor(private fb: FormBuilder) {
    this.user = {
      name: null,
      passworld: null,
      email: null
    };
  }

  public ngOnInit(): void {
    // test
    this.buildForm();
  }

  private buildForm(): void {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(24), forbiddenNameValidator(/sb/gi)]]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  private onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  public formErrors = {
    name: '',
    power: ''
  };

  public validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 4 characters long.',
      maxlength: 'Name cannot be more than 24 characters long.',
      forbiddenName: 'Someone named "Bob" cannot be a hero.'
    },
    power: {
      required: 'Power is required.'
    }
  };
}
