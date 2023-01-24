import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { timer } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SearchComponent),
    },
  ],
})
export class SearchComponent implements OnInit, ControlValueAccessor {
  searchControl = new FormControl();

  public onChange = (v: any) => v;
  public onTouched = () => {};

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounce(() => timer(1000)),
        filter((query) => query.length >= 3)
      )
      .subscribe((query) => this.search.emit(query));
  }

  writeValue(value: any): void {
    this.searchControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
