import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogComponent } from './blog.component';
import { ChartComponent } from './chart';
import { BlogService } from './blog.service';

export const routes: Routes = [
  {path: 'edit', loadChildren: './blog-edit/blog-edit.module#BlogEditModule'},
  {path: 'detail/:id', loadChildren: './blog-detail/blog-detail.module#BlogDetailModule'},
  {path: '', component: BlogComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlogComponent,
    ChartComponent
  ],
  providers: [BlogService]
})

export class BlogModule { }
