import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CollectionModule } from './features/collection/collection.module';

import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { httpInterceptorProviders } from '../app/core/interceptors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CollectionModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
