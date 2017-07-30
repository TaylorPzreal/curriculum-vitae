import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-video',
  template: `
    <div class="">
      <video id="video" src="src/assets/video/ThePursuitofHappyness.mp4" width="600" hidden="hidden" autoplay="autoplay" controls="true"></video>
    </div>
    <div>
      <canvas id="canvas"></canvas>
    </div>
  `,
})
export class VideoComponent implements OnInit {

  public ngOnInit() {
    this.renderVideo();
  }

  private renderVideo() {
    const canvas: any = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const video = document.getElementById('video');

    const w = $(canvas).parent().width();
    canvas.width = w;
    canvas.height = 360;

    video.addEventListener('play', function() {
      const self = this;
      (function loop() {
        if (!self.paused && !self.ended) {
          ctx.drawImage(self, 0, 0);
          setTimeout(loop, 1000 / 60);
        }
      })();
    });
  }
}
