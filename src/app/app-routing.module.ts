// 引入核心模块
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'signup', loadChildren: './func/sign-up/sign-up.module#SignUpModule' },
  { path: 'login', loadChildren: './func/log-in/log-in.module#LogInModule' },
  { path: 'blog', loadChildren: './func/blog/blog.module#BlogModule' },
  { path: 'chat', loadChildren: './func/chat/chat.module#ChatModule' },
  { path: 'game', loadChildren: './func/game/game.module#GameModule' },
  { path: 'game3d', loadChildren: './func/game-3d/game-3d.module#Game3DModule' },
  { path: '404', loadChildren: './func/page-not-found/page-not-found.module#PageNotFoundModule'},
  { path: '', loadChildren: './func/home/home.module#HomeModule', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];

// PreloadAllModules预加载所有Module , {preloadingStrategy: PreloadAllModules}, 不加就是lazy loading
// RouteModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
