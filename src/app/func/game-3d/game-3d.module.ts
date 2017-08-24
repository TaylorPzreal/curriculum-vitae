import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { Game3DComponent } from './game-3d.component';

export const routes: Routes = [
  {path: '', component: Game3DComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Game3DComponent
  ]
})

export class Game3DModule { }
