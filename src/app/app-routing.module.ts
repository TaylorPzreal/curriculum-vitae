
// 引入核心模块
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found';

const routes: Routes = [
  {path: 'signup', loadChildren: '../app/sign-up/sign-up.module#SignUpModule'},
  {path: 'login', loadChildren: '../app/login/login.module#LoginModule'},
  {path: 'blogs', loadChildren: '../app/blog-list/blog-list.module#BlogListModule'},
  {path: 'bloge', loadChildren: '../app/blog-edit/blog-edit.module#BlogEditModule'},
  {path: 'blogv/:id', loadChildren: '../app/blog-detail/blog-detail.module#BlogDetailModule'},
  {path: 'chat', loadChildren: '../app/chat/chat.module#ChatModule'},
  {path: 'game', loadChildren: '../app/game/game.module#GameModule'},
  {path: 'game3d', loadChildren: '../app/game-3d/game-3d.module#Game3DModule'},
  {path: '', loadChildren: '../app/home/home.module#HomeModule'},
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

// PreloadAllModules预加载所有Module , {preloadingStrategy: PreloadAllModules}, 不加就是lazy loading
// RouteModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

