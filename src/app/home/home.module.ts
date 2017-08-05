import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { VideoComponent } from '../video';
import { ChartComponent } from './chart';

export const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    JsonpModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    VideoComponent,
    ChartComponent
  ]
})

export class HomeModule { }
