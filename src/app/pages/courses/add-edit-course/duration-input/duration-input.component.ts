import { Component, OnInit, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';

import { IDurationFormControl } from '../../../../interfaces/formValidation.interface';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DurationInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DurationInputComponent),
    },
  ],
})
export class DurationInputComponent
  implements OnInit, ControlValueAccessor, Validator
{
  public readonly durationControl = new FormControl();

  public onChange = (v: string) => v;
  public onTouched = () => {};

  constructor() {}

  ngOnInit(): void {
    this.durationControl.addValidators([this.validate, Validators.required]);
    this.durationControl.valueChanges.subscribe((v) => {
      this.onChange(v);
    });
  }

  validate(control: AbstractControl): IDurationFormControl {
    const date = Number(control?.value);
    if (typeof date !== 'number') {
      return {
        mustBeNumber: true,
      };
    }

    return {
      mustBeNumber: false,
    };
  }

  writeValue(value: string): void {
    this.durationControl.setValue(value);
  }

  registerOnChange(fn: (v: string) => string): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public isInvalid(): boolean {
    return (
      this.durationControl.invalid &&
      (this.durationControl.dirty || this.durationControl.touched)
    );
  }
}
