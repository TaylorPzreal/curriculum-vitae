import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StudyComponent } from './study.component';
const ROUTES: Routes = [
  { path: '', component: StudyComponent }
];

@NgModule({
  declarations: [
    StudyComponent
  ],
  imports: [ CommonModule, RouterModule.forChild(ROUTES) ],
  exports: [],
  providers: [],
})
export class StudyModule {}
