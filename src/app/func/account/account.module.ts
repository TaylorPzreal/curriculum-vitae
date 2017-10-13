import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile';

const ROUTES: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        children: [{ path: 'profile', component: ProfileComponent }]
      }
    ]
  }
];

@NgModule({
  declarations: [AccountComponent, ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [],
  providers: []
})
export class AccountModule {}
