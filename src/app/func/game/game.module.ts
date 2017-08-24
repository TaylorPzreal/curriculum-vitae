import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { GameComponent } from './game.component';

export const routes: Routes = [
  {path: '', component: GameComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GameComponent
  ]
})

export class GameModule { }
