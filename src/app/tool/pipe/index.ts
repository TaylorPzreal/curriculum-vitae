import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgPathPrePipe } from './img-path-pre.pipe';
import { TrustHTMLPipe } from './trust-html.pipe';
import { TrustURLPipe } from './trust-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImgPathPrePipe,
    TrustHTMLPipe,
    TrustURLPipe
  ],
  exports: [
    ImgPathPrePipe,
    TrustHTMLPipe,
    TrustURLPipe
  ]
})
export class HmPipeModule { }
