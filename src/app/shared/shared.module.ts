import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from './loading/loading.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DurationPipe } from './duration.pipe';
import { HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    LoadingComponent,
    DurationPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    LoadingComponent,
    DurationPipe,
    TranslateModule,
  ],
})
export class SharedModule {}
