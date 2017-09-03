import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './log-in.component';

export const routes: Routes = [
  {path: '', component: LogInComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    LogInComponent
  ]
})

export class LogInModule { }
