import { Injector, NgModule, ProviderToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContextHttpInterceptor } from '@core/interceptors/context-http.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [], //{ provide: HTTP_INTERCEPTORS, useClass: ContextHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}

export function rootInject<T>(token: ProviderToken<T>): any {
  return AppModule.injector.get<T>(token);
}
