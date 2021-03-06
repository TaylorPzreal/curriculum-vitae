import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../../tool/share';
import { HmPipeModule } from '../../../tool/pipe';

import { BlogDetailComponent } from './blog-detail.component';

export const routes: Routes = [
  {path: '', component: BlogDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    HmPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlogDetailComponent
  ]
})

export class BlogDetailModule { }
