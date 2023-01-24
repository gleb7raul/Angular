import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './pages/courses/courses.module';
import { LoginModule } from './pages/login/login.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { RootComponent } from './root/root.component';
import { P404Component } from './pages/p404/p404.component';

import { AuthService } from './services/auth-service.service';

import { TokenInterceptor } from './interceptors/auth.interceptor';
import { EffectsModule } from '@ngrx/effects';

import { appReducer } from './+state/app.reducers';
import { AppEffects } from './+state/app.effects';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [RootComponent, P404Component],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    CoursesModule,
    LoginModule,
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
