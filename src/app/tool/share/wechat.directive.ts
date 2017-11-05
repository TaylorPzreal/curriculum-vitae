declare var require: any;

import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
const QRCode = require('qrcode');

@Directive({
  selector: '[hmToggleWechat]'
})
export class WechatDirective {
  private parentElement: HTMLElement;
  private canvasElement: HTMLCanvasElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.parentElement = this.el.nativeElement.parentElement;
    this.canvasElement = this.renderer.createElement('canvas');
    this.renderer.addClass(this.canvasElement, 'animated');
    this.renderer.addClass(this.canvasElement, 'fadeIn');
    this.renderer.setStyle(this.canvasElement, 'display', 'none'); // default does not display.
    this.renderer.appendChild(this.parentElement, this.canvasElement);

    this.renderQRCode();
  }

  @HostListener('mouseenter') private onMouseEnter() {
    this.showQRCode(true);
  }

  @HostListener('mouseleave') private onmouseleave() {
    this.showQRCode(false);
  }

  /**
   * Toggle show hide
   *
   * @private
   * @param {boolean} show
   * @memberof WechatDirective
   */
  private showQRCode(show: boolean) {
    if (show) {
      this.renderer.setStyle(this.canvasElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.canvasElement, 'display', 'none');
    }
  }

  /**
   * 渲染QRCode
   *
   * @private
   * @memberof WechatDirective
   */
  private renderQRCode() {
    QRCode.toCanvas(this.canvasElement, location.href, {
      // modules,              // Bitmatrix class with modules data
      // version,              // Calculated QR Code version
      errorCorrectionLevel: 'M', // Error Correction Level L,M,Q,H
      // maskPattern,          // Calculated Mask pattern
      // segments              // Generated segments
    }, (err: any, canvas: HTMLCanvasElement) => {
      if (err) {
        throw err;
      }
    });
  }
}
