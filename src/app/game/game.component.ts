import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';

@Component({
  selector: 'cv-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private game: Phaser.Game;
  private platforms: Phaser.Group;
  private player: Phaser.Sprite;
  private cursors: Phaser.CursorKeys;
  private stars: Phaser.Group;
  private score: number = 0;
  private scoreText: Phaser.Text;

  private config: object = {
    width: 1170,
    height: 700,
    renderer: Phaser.AUTO,
    antialias: true,
    parent: 'game-content',
    state: {
      preload: this.preload,
      create: this.create,
      update: this.update
    }
  };

  constructor(private titleService: Title) {
    this.titleService.setTitle('Game - HoneyMorning');
  }

  public ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }

  private preload(): void {
    // this.game.load.image('logo', 'src/assets/images/magic/fly_person.png');
    this.game.load.image('sky', 'src/assets/images/magic/game/sky-magic.jpg');
    this.game.load.image('star', 'src/assets/images/magic/game/star.png');
    this.game.load.image('ground', 'src/assets/images/magic/game/platform.png');
    this.game.load.image('cloud', 'src/assets/images/magic/game/cloud.svg');
    this.game.load.spritesheet('dude', 'src/assets/images/magic/game/dude.png', 32, 48);
  }
  private create(): void {
    //  const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    //  logo.anchor.setTo(0.5, 0.5);
    //  logo.scale.setTo(0.2, 0.2);
    //  this.game.add.tween(logo.scale).to({x: 1, y: 1}, 2000, Phaser.Easing.Bounce.Out, true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    const sky = this.game.add.sprite(0, 0, 'sky');
    sky.scale.setTo(0.3, 0.3);

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    const ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(3, 2);
    ground.body.immovable = true;

    let ledge = this.platforms.create(400, 460, 'cloud');
    ledge.scale.setTo(0.6, 0.6 );
    ledge.body.immovable = true;

    ledge = this.platforms.create(100, 250, 'cloud');
    ledge.body.immovable = true;

    ledge = this.platforms.create(800, 300, 'cloud');
    ledge.scale.setTo(0.4, 0.4);
    ledge.body.immovable = true;


    // this.game.add.sprite(0, 0, 'star');

    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    for (let i = 0; i < 12; i++) {
      const star = this.stars.create(i * 70, 0, 'star');
      star.body.gravity.y = 300;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    // this.cursors = this.game.input.keyboard.createCursorKeys();
    const textStyle: Phaser.PhaserTextStyle = {
      fontSize: 32,
      fill: '#fdc7ba'
    };
    this.scoreText = this.game.add.text(16, 16, 'score: 0', textStyle);
  }

  private update(): void {
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.stars, this.platforms);

    this.game.physics.arcade.overlap(this.player, this.stars, collectStar, null, this);

    function collectStar(player: any, star: any) {
      star.kill();
      this.score += 10;
      this.scoreText.text = 'Score: ' + this.score;
    }
    // const hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
    } else {
      this.player.animations.stop();
      this.player.frame = 4;
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -350;
    }
  }
}
