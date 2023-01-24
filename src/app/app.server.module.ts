import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { RootComponent } from './root/root.component';

import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { UNIVERSAL_LOCAL_STORAGE } from '@ng-web-apis/universal';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    {
      provide: LOCAL_STORAGE,
      useExisting: UNIVERSAL_LOCAL_STORAGE,
    },
  ],
  bootstrap: [RootComponent],
})
export class AppServerModule {}
