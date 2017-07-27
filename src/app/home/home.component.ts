import { create } from 'domain';
import { Component, OnInit } from '@angular/core';

import * as Phaser from 'phaser-ce';
import { HomeService } from './home.service';
import { Article } from './article';
import 'lazysizes'; // 图片懒加载

interface IMovie {
  id: number;
  name: string;
  yeay: number;
  summary: string;
  country: string;
  type: string;
  publicDate: Date;
  logo: string;
}

@Component({
  selector: 'cv-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public articleList: Article[];
  public topMovies: IMovie[];

  private game;
  constructor(private homeService: HomeService) {
    this.game = new Phaser.Game(1200, 600, Phaser.AUTO, 'content', {
      preload: this.preload,
      create: this.create
    });
  }

  public ngOnInit() {
    this.initArticle();
    this.initMovie();
  }

  private preload() {

  }
  private create() {
    
  }

  private initPhaser() {
    const game = new Phaser.Game();
  }

  private initArticle() {
    this.homeService.getArticle().subscribe(
      (result: any) => {
        if (2000 === result.code) {
          this.articleList = result.data;
        } else {
          console.error(result.msg);
        }
      },
      (error: any) => {
        console.warn(error);
      }
    );
  }

  private initMovie() {
    this.homeService.getTopMovie().subscribe(
      (result: any) => {
        if (2000 === result.code) {
          this.topMovies = result.data;
        } else {
          console.error(result.msg);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
