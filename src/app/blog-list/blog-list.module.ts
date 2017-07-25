import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListComponent } from './blog-list.component';

export const routes: Routes = [
  {path: '', component: BlogListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlogListComponent
  ]
})

export class BlogListModule { }
