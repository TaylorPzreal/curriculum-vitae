import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from '@angular/forms';

export function validateEmailValidator(emailRe: RegExp): ValidatorFn {
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
export class ValidateEmailValidatorDirective implements Validator, OnChanges {

  @Input() public validateEmail: string;
  private valFn = Validators.nullValidator;

  public ngOnChanges(changes: SimpleChanges) {
    const change = changes['validateEmail'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = validateEmailValidator(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }
  public validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
