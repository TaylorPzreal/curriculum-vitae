import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { CommonModule } from '@angular/common';
import { QuillModule } from '../../tool/quill';

import { HomeComponent } from './home.component';

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
    HomeComponent
  ]
})

export class HomeModule { }
