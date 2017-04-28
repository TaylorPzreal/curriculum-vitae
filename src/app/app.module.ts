import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdIconModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdCardModule,
  MdInputModule,
  MdGridListModule
} from '@angular/material';

// flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { DatavComponent } from './datav';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdInputModule,
    MdGridListModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DatavComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
