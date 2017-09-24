import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MdButtonModule, MdInputModule, MdCheckboxModule } from '@angular/material';

import { GeetestModule } from '../../tool/geetest';
import { LogInComponent } from './log-in.component';

export const routes: Routes = [
  {path: '', component: LogInComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    GeetestModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LogInComponent
  ]
})

export class LogInModule { }
