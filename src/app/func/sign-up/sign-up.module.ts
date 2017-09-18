import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCheckboxModule, MdInputModule, MdButtonModule } from '@angular/material';

import { SignUpComponent } from './sign-up.component';

export const routes: Routes = [
  {path: '', component: SignUpComponent}
];

@NgModule({
  imports: [
    CommonModule,
    MdCheckboxModule,
    MdInputModule,
    MdButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SignUpComponent
  ]
})
export class SignUpModule { }
