import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? {forbiddenName: {name}} : null;
  };
}

@Directive({
  selector: '[forbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator, OnChanges {

  @Input() public forbiddenName: string;
  private valFn = Validators.nullValidator;

  public ngOnChanges(changes: SimpleChanges): void {
    // const change = changes['forbiddenName'];
    // if (change) {
    //   const val: string | RegExp = change.currentValue;
    //   const re = val instanceof RegExp ? val : new RegExp(val, 'i');
    //   this.valFn = forbiddenNameValidator(re);
    // } else {
    //   this.valFn = Validators.nullValidator;
    // }
  }
  public validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
