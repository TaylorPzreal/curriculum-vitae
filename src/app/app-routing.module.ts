
// 引入核心模块
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { BlogListComponent } from './blog-list';
import { BlogEditComponent } from './blog-edit';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'bloglist', component: BlogListComponent},
  {path: 'blogedit', component: BlogEditComponent},
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

