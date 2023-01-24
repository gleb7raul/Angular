import { Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';

import { CoursesService } from '../../courses.service';
import { IAuthorsFormControl } from '../../../../interfaces/formValidation.interface';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AuthorsInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AuthorsInputComponent),
    },
  ],
})
export class AuthorsInputComponent
  implements OnInit, ControlValueAccessor, Validator
{
  public readonly authorsControl = new FormControl();

  public onChange = (v: any) => v;
  public onTouched = () => {};

  public suggestionItems: any[] = [];
  public selectedAuthors: any[] = [];

  constructor(private service: CoursesService) {}

  ngOnInit(): void {
    this.authorsControl.addValidators([this.validate, Validators.required]);
    this.authorsControl.valueChanges.subscribe((v) => {
      if (!v) {
        this.suggestionItems = [];
      } else if (v.length >= 3) {
        this.searchAPI(v);
      }
    });
  }

  public searchAPI(query: string): void {
    this.service.searchAuthors(query).subscribe((authors: any[]): void => {
      this.suggestionItems = authors;
    });
  }

  public selectAuthor(author: object): void {
    this.selectedAuthors.push(author);
    this.suggestionItems = [];
    this.change();
  }

  public deleteSelectAuthor(author: any): void {
    this.selectedAuthors = this.selectedAuthors.filter(
      (item) => item.id !== author.id
    );
    this.change();
  }

  private change(): void {
    this.onChange(this.selectedAuthors);
    this.onTouched();
  }

  validate(control: AbstractControl): IAuthorsFormControl {
    if (!control.value.length) {
      return {
        mustBeAuthor: true,
      };
    }

    return {
      mustBeAuthor: false,
    };
  }

  writeValue(value: string): void {
    this.authorsControl.setValue(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public isInvalid(): boolean {
    return (
      this.authorsControl.invalid &&
      (this.authorsControl.dirty || this.authorsControl.touched)
    );
  }
}
