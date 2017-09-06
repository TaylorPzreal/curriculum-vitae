import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

const ROUTES: Routes = [
  { path: '', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: [],
})
export class PageNotFoundModule {}
