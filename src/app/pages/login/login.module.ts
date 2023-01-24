import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../services/auth-service.service';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent, SharedModule, TranslateModule],
  providers: [AuthService],
})
export class LoginModule {}
