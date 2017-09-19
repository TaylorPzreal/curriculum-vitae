import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from '@angular/forms';

export function validateEmailValidator(): ValidatorFn {
  const emailRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return (control: AbstractControl): {[key: string]: any} => {
    const email = control.value;
    const no = emailRe.test(email);
    return !no ? {validateEmail: {email}} : null;
  };
}

@Directive({
  selector: '[validateEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateEmailValidatorDirective, multi: true}]
})
export class ValidateEmailValidatorDirective implements Validator {
  @Input() public email: string;

  public validate(control: AbstractControl): {[key: string]: any} {
    return this.email ? validateEmailValidator()(control) : null;
  }
}
