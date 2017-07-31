
// 引入核心模块
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: 'signup', loadChildren: '../app/sign-up/sign-up.module#SignUpModule'},
  {path: 'login', loadChildren: '../app/login/login.module#LoginModule'},
  {path: 'bloglist', loadChildren: '../app/blog-list/blog-list.module#BlogListModule'},
  {path: 'blogedit', loadChildren: '../app/blog-edit/blog-edit.module#BlogEditModule'},
  {path: 'blogdetail/:id', loadChildren: '../app/blog-detail/blog-detail.module#BlogDetailModule'},
  {path: 'chat', loadChildren: '../app/chat/chat.module#ChatModule'},
  {path: 'game', loadChildren: '../app/game/game.module#GameModule'},
  {path: '', loadChildren: '../app/home/home.module#HomeModule'},
  { path: '', redirectTo: '', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent }
];

// PreloadAllModules预加载所有Module
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

