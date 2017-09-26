import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponent } from './share.component';
import { WechatDirective } from './wechat.directive';

@NgModule({
  declarations: [
    ShareComponent,
    WechatDirective
  ],
  imports: [ CommonModule ],
  exports: [
    ShareComponent
  ],
  providers: [],
})
export class ShareModule {}
