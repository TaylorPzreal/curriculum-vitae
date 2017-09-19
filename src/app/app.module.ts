import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppToastsManager } from './tool/toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
import { AppInterceptor } from './app.interceptor';

import { MdSnackBarModule } from '@angular/material';
import { SnackBar } from './tool/snackbar';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MdSnackBarModule,
    ToastModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    Title,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: ToastsManager,
      useClass: AppToastsManager
    },
    SnackBar
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
