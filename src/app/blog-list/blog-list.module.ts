import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogListComponent } from './blog-list.component';

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
  ]
})

export class BlogListModule { }
