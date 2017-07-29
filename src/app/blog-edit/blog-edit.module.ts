import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BlogEditComponent } from './blog-edit.component';
import { QuillComponent } from '../quill';

export const routes: Routes = [
  {path: '', component: BlogEditComponent}
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlogEditComponent,
    QuillComponent
  ]
})

export class BlogEditModule { }
