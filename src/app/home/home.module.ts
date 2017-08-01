import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { VideoComponent } from '../video';

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
    VideoComponent
  ]
})

export class HomeModule { }
