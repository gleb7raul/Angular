import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Authorization } from 'src/app/interfaces/authorization.interface';

import * as AppActions from '../../+state/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  reactiveForm!: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.formInit();
  }

  public formInit(): void {
    this.reactiveForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get login() {
    return this.reactiveForm.get('login')!;
  }

  get password() {
    return this.reactiveForm.get('password')!;
  }

  public onFormSubmit(): void {
    const data = this.reactiveForm.value;
    this.store.dispatch(AppActions.loadToken({ auth: data }));
  }
}
