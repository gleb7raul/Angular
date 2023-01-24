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

import { IDateFormControl } from '../../../../interfaces/formValidation.interface';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DateInputComponent),
    },
  ],
})
export class DateInputComponent
  implements OnInit, ControlValueAccessor, Validator
{
  public readonly dateControl = new FormControl();

  public onChange = (v: string) => v;
  public onTouched = () => {};

  constructor() {}

  ngOnInit(): void {
    this.dateControl.addValidators([this.validate, Validators.required]);
    this.dateControl.valueChanges.subscribe((v) => {
      this.onChange(v);
    });
  }

  validate(control: AbstractControl): IDateFormControl {
    const dateformat =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const date = control?.value;
    if (!date?.value?.match(dateformat)) {
      return {
        mustBeFormat: true,
      };
    }

    return {
      mustBeFormat: false,
    };
  }

  writeValue(value: string): void {
    this.dateControl.setValue(value);
  }

  registerOnChange(fn: (v: string) => string): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public isInvalid(): boolean {
    return (
      this.dateControl.invalid &&
      (this.dateControl.dirty || this.dateControl.touched)
    );
  }
}
