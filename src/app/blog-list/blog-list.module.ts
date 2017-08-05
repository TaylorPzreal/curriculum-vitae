import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogListComponent } from './blog-list.component';
import { ChartComponent } from './chart';

export const routes: Routes = [
  {path: '', component: BlogListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlogListComponent,
    ChartComponent
  ]
})

export class BlogListModule { }
