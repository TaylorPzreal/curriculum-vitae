import * as d3 from 'd3';
import * as PIXI from 'pixi.js';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'datav',
  templateUrl: 'datav.component.html',
  styleUrls: ['datav.component.scss']
})

export class DatavComponent implements OnInit {
  private width = document.body.clientWidth - 120;
  private height = document.body.offsetHeight;
  private bgc = {
    backgroundColor: 0x1099bb
  };

  public ngOnInit() {

    // this.initKnowledge();

    this.initPIXI();
    this.initPIXITexture();
  }

  public initPIXI(): void {

    const app = new PIXI.Application(this.width, this.height, this.bgc);

    document.getElementById('knowledge').appendChild(app.view);

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    });

    const richText = new PIXI.Text('开启H5英雄之路', style);
    richText.x = 30;
    richText.y = 50;

    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const bg = PIXI.Sprite.fromImage('src/assets/images/usercenter/login_bg_1.jpg');
    app.stage.addChild(bg);

    const cells = PIXI.Sprite.fromImage('src/assets/images/magic/flowerup.jpg');
    cells.scale.set(1);

    const mask = PIXI.Sprite.fromImage('src/assets/images/magic/fly_person2.png');
    mask.anchor.set(0.2);
    mask.width = 100;
    mask.height = 100;
    mask.x = this.width / 2;
    mask.y = this.height / 2;

    cells.mask = mask;
    app.stage.addChild(mask, cells);

    const target = new PIXI.Point();

    reset();

    function reset() {
      target.x = Math.floor(Math.random() * 600);
      target.y = Math.floor(Math.random() * 600);
    }

    app.ticker.add(() => {

      mask.x += (target.x - mask.x) * 0.1;
      mask.y += (target.y - mask.y) * 0.1;

      if (Math.abs(mask.x - target.x) < 1) {
        reset();
      }
    });

    app.stage.addChild(richText);


  }

  /**
   * 初始化移动布局
   * ...
   * @memberof DatavComponent
   */
  public initPIXITexture(): void {
    const app = new PIXI.Application(this.width, this.height, this.bgc);

    document.getElementById('texture').appendChild(app.view);

    const texture = PIXI.Texture.fromImage('src/assets/images/magic/fly_person2.png');

    // Scale mode for pixelation
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    for (let i = 0; i < 10; i++) {
      createBunny(
        Math.floor(Math.random() * app.renderer.width),
        Math.floor(Math.random() * app.renderer.height)
      );
    }

    function createBunny(x: number, y: number) {

      // create our little bunny friend..
      const bunny = new PIXI.Sprite(texture);

      // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
      bunny.interactive = true;

      // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
      bunny.buttonMode = true;

      // center the bunny's anchor point
      bunny.anchor.set(0.5);

      // make it a bit bigger, so it's easier to grab
      bunny.scale.set(0.2);

      // setup events for mouse + touch using
      // the pointer events
      bunny
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

      // For mouse-only events
      // .on('mousedown', onDragStart)
      // .on('mouseup', onDragEnd)
      // .on('mouseupoutside', onDragEnd)
      // .on('mousemove', onDragMove);

      // For touch-only events
      // .on('touchstart', onDragStart)
      // .on('touchend', onDragEnd)
      // .on('touchendoutside', onDragEnd)
      // .on('touchmove', onDragMove);

      // move the sprite to its designated position
      bunny.x = x;
      bunny.y = y;

      // add it to the stage
      app.stage.addChild(bunny);
    }

    function onDragStart(event: any) {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
    }

    function onDragEnd() {
      this.alpha = 1;
      this.dragging = false;
      // set the interaction data to null
      this.data = null;
    }

    function onDragMove() {
      if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
      }
    }


  }

  // public initKnowledge(): void {

  //   // SVG 图形大小
  //   const width = document.body.clientWidth;
  //   const height = document.body.clientHeight;

  //   const svg = d3.select('#knowledge').append('svg')
  //     .attr('width', width - 120)
  //     .attr('height', height);

  //   const g = svg.append('g')
  //     .attr('transform', `translate(${width / 2}, ${height / 2})`);

  //   const tree = d3.tree()
  //     .size([360, 500])
  //     .separation((a, b) => {
  //       return (a.parent === b.parent ? 1 : 2) / a.depth;
  //     });

  //   const JsonData = {
  //     name: '我的大前端',
  //     children: [{
  //       name: 'JavaScript',
  //       children: [{
  //         name: 'jQuery'
  //       }, {
  //         name: 'Angularjs'
  //       }, {
  //         name: 'Angular'
  //       }]
  //     }, {
  //       name: 'HTML5',
  //       children: [{
  //           name: 'SVG'
  //         },
  //         {
  //           name: 'Canvas'
  //         }
  //       ]
  //     }, {
  //       name: 'CSS3',
  //       children: [{
  //         name: 'Sass'
  //       }, {
  //         name: 'postCss'
  //       }]
  //     }]
  //   };

  //   // const stratify = d3.stratify()
  //   //     .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

  //   const root = d3.hierarchy(JsonData);
  //   // root.sum((d) => (d.value)).sort((a, b) => b.value - a.value);
  //   tree(root);

  //   function project(x: number, y: number) {
  //     const angle = (x - 90) / 180 * Math.PI;
  //     const radius = y;
  //     return [radius * Math.cos(angle), radius * Math.sin(angle)];
  //   }

  //   // const link = g.selectAll('.link')
  //   //   .data(root.descendants().slice(1))
  //   //   .enter().append('path')
  //   //   .attr('class', 'link')
  //   //   .attr('d', (d) => {
  //   //     return 'M' + project(d.x, d.y) +
  //   //       'C' + project(d.x, (d.y + d.parent.y) / 2) +
  //   //       ' ' + project(d.parent.x, (d.y + d.parent.y) / 2) +
  //   //       ' ' + project(d.parent.x, d.parent.y);
  //   //   });


  //   const node = g.selectAll('.node')
  //     .data(root.descendants())
  //     .enter().append('g')
  //     .attr('class', (d) => {
  //       return 'node' + (d.children ? ' node--internal' : ' node--leaf');
  //     })
  //     .attr('transform', (d) => {
  //       return 'translate(' + project(d.x, d.y) + ')';
  //     });

  //   node.append('circle')
  //     .attr('r', 2.5);

  //   node.append('text')
  //     .attr('dy', '.31em')
  //     .attr('x', (d) => {
  //       return d.x < 180 === !d.children ? 6 : -6;
  //     })
  //     .style('text-anchor', (d) => {
  //       return d.x < 180 === !d.children ? 'start' : 'end';
  //     })
  //     .attr('transform', (d) => {
  //       return 'rotate(' + (d.x < 180 ? d.x - 90 : d.x + 90) + ')';
  //     })
  //     .text((d) => {
  //       return d.data.name;
  //     });
  // }

}
