import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { BlogListComponent } from './blog-list';
import { BlogEditComponent } from './blog-edit';

import { HomeService } from './home/home.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BlogListComponent,
    BlogEditComponent
  ],
  providers: [HomeService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
