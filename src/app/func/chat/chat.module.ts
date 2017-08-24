import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat.component';

export const routes: Routes = [
  {path: '', component: ChatComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ChatComponent
  ]
})

export class ChatModule { }
