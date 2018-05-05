import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[repeatPassword][formControlName],[repeatPassword][formControl],[repeatPassword][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: RepeatPasswordValidatorDirective, multi: true}
  ]
})
export class RepeatPasswordValidatorDirective implements Validator {

  @Input('repeatPassword')
  passwordInput: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.passwordInput ? this.passwordsAreEqual(this.passwordInput)(control) : null;
  }

  passwordsAreEqual(password: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const equal = control.value === this.passwordInput;
      return !equal ? {'passwordsEqual': {value: control.value}} : null;
    };
  }

}
