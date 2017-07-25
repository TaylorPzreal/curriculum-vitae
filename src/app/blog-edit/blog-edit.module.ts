import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { BlogEditComponent } from './blog-edit.component';
import { QuillComponent } from '../quill';

export const routes: Routes = [
  {path: '', component: BlogEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlogEditComponent,
    QuillComponent
  ]
})

export class BlogEditModule { }
