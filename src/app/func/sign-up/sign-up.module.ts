import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatInputModule, MatButtonModule } from '@angular/material';
import { GeetestModule } from '../../tool/geetest';

import { SignUpComponent } from './sign-up.component';
import { ForbiddenValidatorDirective } from './forbidden-name.directive';
import { ValidateEmailValidatorDirective } from './validate-email.directive';

export const routes: Routes = [
  {path: '', component: SignUpComponent}
];

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    GeetestModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SignUpComponent,
    ForbiddenValidatorDirective,
    ValidateEmailValidatorDirective
  ]
})
export class SignUpModule { }
