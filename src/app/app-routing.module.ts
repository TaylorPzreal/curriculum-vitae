
// 引入核心模块
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './func/page-not-found';

const routes: Routes = [
  {path: 'signup', loadChildren: './func/sign-up/sign-up.module#SignUpModule'},
  {path: 'login', loadChildren: './func/login/login.module#LoginModule'},
  {path: 'blogs', loadChildren: './func/blog-list/blog-list.module#BlogListModule'},
  {path: 'bloge', loadChildren: './func/blog-edit/blog-edit.module#BlogEditModule'},
  {path: 'blogv/:id', loadChildren: './func/blog-detail/blog-detail.module#BlogDetailModule'},
  {path: 'chat', loadChildren: './func/chat/chat.module#ChatModule'},
  {path: 'game', loadChildren: './func/game/game.module#GameModule'},
  {path: 'game3d', loadChildren: './func/game-3d/game-3d.module#Game3DModule'},
  {path: '', loadChildren: './func/home/home.module#HomeModule', pathMatch: 'full'},
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

