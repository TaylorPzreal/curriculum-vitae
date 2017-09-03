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

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './func/page-not-found';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
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
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
