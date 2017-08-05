import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { CommonModule } from '@angular/common';
import { QuillModule } from '../quill';

import { HomeComponent } from './home.component';
import { ChartComponent } from './chart';

export const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    JsonpModule,
    CommonModule,
    QuillModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    ChartComponent
  ]
})

export class HomeModule { }
