import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CKEditorModule } from 'ng2-ckeditor';
// import { NgxCropperModule } from 'ngx-cropper';

import { BlogEditComponent } from './blog-edit.component';

export const routes: Routes = [
  {path: '', component: BlogEditComponent}
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CKEditorModule,
    // NgxCropperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlogEditComponent
  ]
})

export class BlogEditModule { }
