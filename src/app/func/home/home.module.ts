import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../../tool/share';

import { HomeComponent } from './home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    JsonpModule,
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule { }
