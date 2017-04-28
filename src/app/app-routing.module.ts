
// 引入核心模块
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { DatavComponent } from './datav';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'datav', component: DatavComponent},
  {path: '', component: HomeComponent},
  { path: '', redirectTo: '', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

